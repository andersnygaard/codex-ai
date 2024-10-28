import { Body, Get, Post, Route } from "tsoa";
import bus from '../../bus/CodexBus';
import markdownService from "../../services/markdownService";
import { StartSceneCommand } from "./sends/startScene";
import MarkdownService from "../../services/markdownService";

interface PingResponse {
  message: string;
}

interface ScriptContent {
  content: string;
}

@Route("ScriptOutline")
export class ScriptOutlineController {
    
  @Post("/")
  public async setScript(@Body() body: ScriptContent): Promise<PingResponse> {
    
    console.log(body.content);

    await new MarkdownService("script_outline.md").writeToFile(body.content);
    
    return {
      message: "OK",
    };
  }

  @Get("/")
  public async getScript(): Promise<string> {
    const service = new MarkdownService("script_outline.md");
    const data = service.readFromFile();

    return data;
  }

  @Get("/generate")
  public async generateScript(): Promise<PingResponse> {
    
    await bus.sendMessage(new StartSceneCommand());

    return {
      message: "OK",
    };
  }
}