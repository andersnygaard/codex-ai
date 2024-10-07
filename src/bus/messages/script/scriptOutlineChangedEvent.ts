// reserve-room.ts

import { Command } from '@node-ts/bus-messages'
import { injectable } from 'inversify'

@injectable()
export class ScriptOutlineChangedEvent extends Command {
  $name = 'scriptoutline/changed';
  $version = 1;
  
  constructor (
    readonly feedback: string,
  ) {
    super()
  }
}