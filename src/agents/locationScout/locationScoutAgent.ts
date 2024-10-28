import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, ParamsFromFString } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import MarkdownService from "../../services/markdownService";
import { Runnable, RunnableConfig } from "@langchain/core/runnables";
import CallbackHandler from "langfuse-langchain";
import { LocationFoundCommand } from "./sends/locationFound";
import busInstance from "../../bus/CodexBus";



class LocationScoutAgent {

    private model: ChatOpenAI = null!;
    private chain: Runnable<ParamsFromFString<string>, string, RunnableConfig> = null!
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

    public async findLocation(sceneDescription: string): Promise<string> {
        if (!this.ready) {
            await this.prepare();
        }

        const scriptOutline = await new MarkdownService("script_outline.md").readFromFile();
        const template = await new MarkdownService("locationScout_findLocation.md").readFromFile();

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
            topic: "location scout generate location",
        }, { callbacks: [langfuseHandler] });

        console.log(response);

        await busInstance.sendMessage(new LocationFoundCommand(response))

        return response;        
    }
}

const agent = new LocationScoutAgent()

export default agent;