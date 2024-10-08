import { handlerFor } from '@node-ts/bus-core';
import { GenerateLocationCommand } from '../../messages/location/generateLocationCommand';
import locationScoutAgent from '../../../agents/locationScoutAgent';

// Function based handler
const generateLocationCommandHandler = handlerFor(
  GenerateLocationCommand,
  async (message: GenerateLocationCommand) => {
    await locationScoutAgent.generateLocation();
  }
);

export default generateLocationCommandHandler;