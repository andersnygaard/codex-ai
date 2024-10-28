import { handlerFor } from '@node-ts/bus-core';
import screenWriterAgent from '../screenWriterAgent';
import { GetDialogCommand } from '../../storyConsultant/sends/getDialog';

// Function based handler
const getDialogCommandHandler = handlerFor(
  GetDialogCommand,
  async (message: GetDialogCommand) => {
    await screenWriterAgent.getDialog(message.sceneDescription, message.previousDialog);
  }
);

export default getDialogCommandHandler;