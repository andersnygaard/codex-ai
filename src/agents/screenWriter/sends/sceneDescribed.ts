import { Command } from '@node-ts/bus-messages'
import { injectable } from 'inversify'

@injectable()
export class SceneDescribedCommand extends Command {
  $name = 'screenWriter/sceneDescribed';
  $version = 1;
  
  constructor (
    readonly sceneDescription: string
  ) {
    super()
  }
}