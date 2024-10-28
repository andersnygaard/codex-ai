import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, ParamsFromFString } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import MarkdownService from "../../services/markdownService";
import { Runnable, RunnableConfig } from "@langchain/core/runnables";
import CallbackHandler from "langfuse-langchain";
import busInstance from "../../bus/CodexBus";
import { DescribeSceneCommand } from "./sends/describeScene";
import { FindLocationCommand } from "./sends/findLocation";
import messageService from "../../services/messageService";
import { GetDialogCommand } from "./sends/getDialog";

class StoryConsultantAgent {

    private model: ChatOpenAI = null!;
    private chain: Runnable<ParamsFromFString<string>, string, RunnableConfig> = null!
    private sceneDescription: string = null!;
    private sceneLocation: string = null!;
    private sceneDialog: string[] = null!;
    private ready = false;

    async prepare() {
        const key = await new MarkdownService("api_key.md").readFromFile();

        this.model = new ChatOpenAI({
            temperature: 0.9,
            apiKey: key,
            modelName: "gpt-4"
        });

        this.ready = true;
    }


    public async startScene(): Promise<string> {
        if (!this.ready) {
            await this.prepare();
        }

        this.sceneDescription = "";
        this.sceneDialog = [];

        const scriptOutline = await new MarkdownService("script_outline.md").readFromFile();
        const template = await new MarkdownService("storyconsultant_startScene.md").readFromFile();

        const prompt = ChatPromptTemplate.fromMessages([
            ["human", template],
            ["human", scriptOutline],
        ]);

        const outputParser = new StringOutputParser();

        const chain = prompt.pipe(this.model).pipe(outputParser);

        const langfuseHandler = new CallbackHandler({
            secretKey: "sk-lf-af56bcfc-ea67-4664-8f70-5750fa5a3958",
            publicKey: "pk-lf-19ad3f7d-03c2-4cf2-8b37-d7d10e8d7c74",
            baseUrl: "http://localhost:3030",
            tags: ["startScene"],
            persistence_name: "test"
        });

        const response = await chain.invoke({
            topic: "storyConsultant start scene",
        }, { callbacks: [langfuseHandler] });

        this.sceneDescription = response;

        await busInstance.sendMessage(new DescribeSceneCommand(response))

        return response;        
    }

    public async dialogCreated(line: string): Promise<string> {
        if (!this.ready) {
            await this.prepare();
        }

        messageService.send(line);
        this.sceneDialog.push(line);

        if (this.sceneDialog.length < 20) {
            await busInstance.sendMessage(new GetDialogCommand(this.sceneDescription, this.sceneDialog))
            return "";
        }

        const scriptOutline = await new MarkdownService("script_outline.md").readFromFile();
        const template = await new MarkdownService("storyconsultant_evaluateScript.md").readFromFile();

        const prompt = ChatPromptTemplate.fromMessages([
            ["human", template],
            ["human", scriptOutline],
            ["human", this.sceneDescription],
            ["human", this.sceneDialog.join(" | ")],
        ]);

        const outputParser = new StringOutputParser();

        const chain = prompt.pipe(this.model).pipe(outputParser);

        const langfuseHandler = new CallbackHandler({
            secretKey: "sk-lf-af56bcfc-ea67-4664-8f70-5750fa5a3958",
            publicKey: "pk-lf-19ad3f7d-03c2-4cf2-8b37-d7d10e8d7c74",
            baseUrl: "http://localhost:3030",
        });

        const response = await chain.invoke({
            topic: "storyConsultant evaluate dialog",
        }, { callbacks: [langfuseHandler] });

        if (response.toLowerCase().startsWith("ja")) {
            await messageService.send("-- scene slutt --");
            return response;
        } else {
            await busInstance.sendMessage(new GetDialogCommand(this.sceneDescription, this.sceneDialog))
        }

        return response;        
    }

    public async sceneDescribed(sceneDescription: string): Promise<void> {
        if (!this.ready) {
            await this.prepare();
        }

        messageService.send(sceneDescription);

        await busInstance.sendMessage(new FindLocationCommand(this.sceneDescription))
    }

    public async locationFound(locationDescription: string): Promise<void> {
        if (!this.ready) {
            await this.prepare();
        }

        this.sceneLocation = locationDescription;

        messageService.send(locationDescription);

        await busInstance.sendMessage(new GetDialogCommand(this.sceneDescription, []))
    }
}

const agent = new StoryConsultantAgent()

export default agent;