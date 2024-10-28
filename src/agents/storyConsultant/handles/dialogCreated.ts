import { handlerFor } from '@node-ts/bus-core';
import storyConsultantAgent from '../storyConsultantAgent';
import { DialogCreatedCommand } from '../../screenWriter/sends/dialogCreated';

// Function based handler
const dialogCreatedCommandHandler = handlerFor(
  DialogCreatedCommand,
  async (message: DialogCreatedCommand) => {
    await storyConsultantAgent.dialogCreated(message.line);
  }
);

export default dialogCreatedCommandHandler;