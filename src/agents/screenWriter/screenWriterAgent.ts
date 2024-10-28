import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, ParamsFromFString } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import MarkdownService from "../../services/markdownService";
import { Runnable, RunnableConfig } from "@langchain/core/runnables";
import CallbackHandler from "langfuse-langchain";
import busInstance from "../../bus/CodexBus";
import { DialogCreatedCommand } from "./sends/dialogCreated";
import { SceneDescribedCommand } from "./sends/sceneDescribed";

class ScreenWriterAgent {

    private model: ChatOpenAI = null!;
    private chain: Runnable<ParamsFromFString<string>, string, RunnableConfig> = null!
    private ready = false;

    async prepare() {
        const key = await new MarkdownService("api_key.md").readFromFile();

        this.model = new ChatOpenAI({
            temperature: 0.8,
            apiKey: key
        });

        this.ready = true;
    }

    public async getDialog(sceneDescription: string, previousDialog: string[]): Promise<string> {
        if (!this.ready) {
            await this.prepare();
        }

        const scriptOutline = await new MarkdownService("script_outline.md").readFromFile();
        const template = await new MarkdownService("screenwriter_getDialog.md").readFromFile();

        const prompt = ChatPromptTemplate.fromMessages([
            ["human", template],
            ["human", scriptOutline],
            ["human", sceneDescription],
            ["human", "Tidligere dialog: \r\n" + previousDialog.join("\r\n")],
        ]);

        const outputParser = new StringOutputParser();

        const chain = prompt.pipe(this.model).pipe(outputParser);

        const langfuseHandler = new CallbackHandler({
            secretKey: "sk-lf-af56bcfc-ea67-4664-8f70-5750fa5a3958",
            publicKey: "pk-lf-19ad3f7d-03c2-4cf2-8b37-d7d10e8d7c74",
            baseUrl: "http://localhost:3030",
        });

        const response = await chain.invoke({
            topic: "screenwriter generated a new line",
        }, { callbacks: [langfuseHandler] });

        await busInstance.sendMessage(new DialogCreatedCommand(response))
      
        return response;        
    }

    public async describeScene(sceneDescription: string): Promise<string> {
        if (!this.ready) {
            await this.prepare();
        }

        const scriptOutline = await new MarkdownService("script_outline.md").readFromFile();
        const template = await new MarkdownService("screenwriter_describeScene.md").readFromFile();

        const prompt = ChatPromptTemplate.fromMessages([
            ["human", template],
            ["human", scriptOutline],
            ["human", sceneDescription]
        ]);

        const outputParser = new StringOutputParser();

        const chain = prompt.pipe(this.model).pipe(outputParser);

        const langfuseHandler = new CallbackHandler({
            secretKey: "sk-lf-af56bcfc-ea67-4664-8f70-5750fa5a3958",
            publicKey: "pk-lf-19ad3f7d-03c2-4cf2-8b37-d7d10e8d7c74",
            baseUrl: "http://localhost:3030",
        });

        const response = await chain.invoke({
            topic: "screenwriter described scene",
        }, { callbacks: [langfuseHandler] });

        await busInstance.sendMessage(new SceneDescribedCommand(response))
      
        return response;        
    }
}



const agent = new ScreenWriterAgent()

export default agent;