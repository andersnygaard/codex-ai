import { handlerFor } from '@node-ts/bus-core';
import { ChangeScriptOutlineCommand } from '../../messages/script/changeScriptOutlineCommand';
import MarkdownService from '../../../services/markdownService';
import bus from '../../CodexBus';
import { ScriptOutlineChangedEvent } from '../../messages/script/scriptOutlineChangedEvent';

// Function based handler
const changeScriptOutlineCommandHandler = handlerFor(
  ChangeScriptOutlineCommand,
  async (message: ChangeScriptOutlineCommand) => {
    console.log("handle message")
    var markdownService = new MarkdownService("script_outline.md");

    console.log("writing to file")
    await markdownService.writeToFile(message.content);

    bus.sendMessage(new ScriptOutlineChangedEvent(message.content))

  }
);

export default changeScriptOutlineCommandHandler;