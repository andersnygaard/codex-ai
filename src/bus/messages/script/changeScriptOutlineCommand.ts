// reserve-room.ts

import { Command } from '@node-ts/bus-messages'
import { injectable } from 'inversify'

@injectable()
export class ChangeScriptOutlineCommand extends Command {
  $name = 'scriptoutline/posted';
  $version = 1;
  
  constructor (
    readonly content: string
  ) {
    super()
  }
}