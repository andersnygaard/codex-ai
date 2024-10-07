import { Get, Post, Route } from "tsoa";
import bus from '../../bus/CodexBus';
import { ChangeScriptOutlineCommand } from "../../bus/messages/script/changeScriptOutlineCommand";

interface PingResponse {
  message: string;
}

@Route("Script")
export class ScriptController {
  
  @Post("/")
  public async setScript(): Promise<PingResponse> {
    await bus.sendMessage(new ChangeScriptOutlineCommand("Hotell Nero. Handlingen er satt til "));
    return {
      message: "OK",
    };
  }

  @Get("/")
  public async getScript(): Promise<PingResponse> {
    await bus.sendMessage(new ChangeScriptOutlineCommand("Hotell Nero. Handlingen er satt til "));
    return {
      message: "OK",
    };
  }
}