import { Command } from '@node-ts/bus-messages'
import { injectable } from 'inversify'

@injectable()
export class DescribeSceneCommand extends Command {
  $name = 'storyConsultant/describeScene';
  $version = 1;
  
  constructor (
    readonly sceneDescription: string
  ) {
    super()
  }
}