import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, ParamsFromFString } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import MarkdownService from "../services/markdownService";
import { Runnable, RunnableConfig } from "@langchain/core/runnables";
import { HumanMessage } from "@langchain/core/messages";



class LocationScoutAgent {

    private model: ChatOpenAI = null!;
    private chain: Runnable<ParamsFromFString<string>, string, RunnableConfig> = null!
    private ready = false;

    async prepare() {
        const key = await new MarkdownService("api_key.md").readFromFile();

        this.model = new ChatOpenAI({
            temperature: 0.9,
            apiKey: key
        });

        this.ready = true;
    }

    public async generateLocation(): Promise<string> {
        if (!this.ready) {
            await this.prepare();
        }

        const scriptOutline = await new MarkdownService("script_outline..md").readFromFile();
        const template = await new MarkdownService("localtionScoutAgentTemplate.md").readFromFile();

        const prompt = ChatPromptTemplate.fromMessages([
            ["human", template],
            ["human", scriptOutline],
            ["human", "Gi oss bekrivelse av en lokasjon for en scene for et manus"],
        ]);

        const outputParser = new StringOutputParser();

        const chain = prompt.pipe(this.model).pipe(outputParser);

        const response = await chain.invoke({
            topic: "location scout generate location",
        });

        console.log(response);

        return response;        
    }
}

const agent = new LocationScoutAgent()

export default agent;