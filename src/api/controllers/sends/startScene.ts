// reserve-room.ts

import { Command } from '@node-ts/bus-messages'
import { injectable } from 'inversify'

@injectable()
export class StartSceneCommand extends Command {
  $name = 'scriptoutline/start';
  $version = 1;
  
  constructor (
  ) {
    super()
  }
}