import { handlerFor } from '@node-ts/bus-core';
import { ChangeScriptOutlineCommand } from '../../messages/script/changeScriptOutlineCommand';
import MarkdownService from '../../../services/markdownService';
import bus from '../../../bus/CodexBus';
import { ScriptOutlineChangedEvent } from '../../messages/script/scriptOutlineChangedEvent';

// Function based handler
const changeScriptOutlineCommandHandler = handlerFor(
  ChangeScriptOutlineCommand,
  async (message: ChangeScriptOutlineCommand) => {
    var markdownService = new MarkdownService("script_outline.md");
    await markdownService.writeToFile(message.content);

    bus.sendMessage(new ScriptOutlineChangedEvent(message.content))

  }
);

export default changeScriptOutlineCommandHandler;