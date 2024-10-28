import { Command } from '@node-ts/bus-messages'
import { injectable } from 'inversify'

@injectable()
export class DialogCreatedCommand extends Command {
  $name = 'screenWriter/dialogCreated';
  $version = 1;
  
  constructor (
    readonly line: string
  ) {
    super()
  }
}