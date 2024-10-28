import { handlerFor } from '@node-ts/bus-core';
import screenWriterAgent from '../screenWriterAgent';
import { DescribeSceneCommand } from '../../storyConsultant/sends/describeScene';

// Function based handler
const describeSceneCommandHandler = handlerFor(
  DescribeSceneCommand,
  async (message: DescribeSceneCommand) => {
    await screenWriterAgent.describeScene(message.sceneDescription);
  }
);

export default describeSceneCommandHandler;