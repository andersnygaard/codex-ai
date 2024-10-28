import { handlerFor } from '@node-ts/bus-core';
import storyConsultantAgent from '../storyConsultantAgent';
import { SceneDescribedCommand } from '../../screenWriter/sends/sceneDescribed';


// Function based handler
const sceneDescribedCommandHandler = handlerFor(
  SceneDescribedCommand,
  async (message: SceneDescribedCommand) => {
    await storyConsultantAgent.sceneDescribed(message.sceneDescription);
  }
);

export default sceneDescribedCommandHandler;