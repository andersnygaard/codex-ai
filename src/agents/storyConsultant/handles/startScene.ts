import { handlerFor } from '@node-ts/bus-core';
import storyConsultantAgent from '../storyConsultantAgent';
import { StartSceneCommand } from '../../../api/controllers/sends/startScene';

// Function based handler
const startSceneCommandHandler = handlerFor(
  StartSceneCommand,
  async (message: StartSceneCommand) => {
    await storyConsultantAgent.startScene();
  }
);

export default startSceneCommandHandler;