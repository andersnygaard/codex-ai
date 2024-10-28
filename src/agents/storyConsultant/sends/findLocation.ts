import { Command } from '@node-ts/bus-messages'
import { injectable } from 'inversify'

@injectable()
export class FindLocationCommand extends Command {
  $name = 'storyConsultant/findLocation';
  $version = 1;
  
  constructor (
    readonly sceneDescription: string
  ) {
    super()
  }
}