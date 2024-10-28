import { handlerFor } from '@node-ts/bus-core';
import storyConsultantAgent from '../storyConsultantAgent';
import { LocationFoundCommand } from '../../locationScout/sends/locationFound';

// Function based handler
const locationFoundCommandHandler = handlerFor(
  LocationFoundCommand,
  async (message: LocationFoundCommand) => {
    await storyConsultantAgent.locationFound(message.locationDescription);
  }
);

export default locationFoundCommandHandler;