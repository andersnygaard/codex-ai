import { Command } from '@node-ts/bus-messages'
import { injectable } from 'inversify'

@injectable()
export class GetDialogCommand extends Command {
  $name = 'storyConsultant/getDialog';
  $version = 1;
  
  constructor (
    readonly sceneDescription: string,
    readonly previousDialog: string[]
  ) {
    super()
  }
}