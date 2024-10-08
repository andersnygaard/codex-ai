// reserve-room.ts

import { Command } from '@node-ts/bus-messages'
import { injectable } from 'inversify'

@injectable()
export class GenerateLocationCommand extends Command {
  $name = 'location/generate';
  $version = 1;
  
  constructor (
  ) {
    super()
  }
}