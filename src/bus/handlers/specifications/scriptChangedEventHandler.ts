import { handlerFor } from '@node-ts/bus-core';
import { ScriptChangedEvent } from '../../messages/script/scriptOutlineChangedEvent';

// Function based handler
const changeScriptCommandHandler = handlerFor(
  ScriptChangedEvent,
  async (message: ScriptChangedEvent) => {
    // invoke agent from here
  }
);

export default changeScriptCommandHandler;