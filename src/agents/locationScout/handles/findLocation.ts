import { handlerFor } from '@node-ts/bus-core';
import { FindLocationCommand } from '../../storyConsultant/sends/findLocation';
import locationScoutAgent from '../locationScoutAgent';

// Function based handler
const findLocationCommandHandler = handlerFor(
  FindLocationCommand,
  async (message: FindLocationCommand) => {
    await locationScoutAgent.findLocation(message.sceneDescription);
  }
);

export default findLocationCommandHandler;