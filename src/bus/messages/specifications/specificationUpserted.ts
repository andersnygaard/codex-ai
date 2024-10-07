// reserve-room.ts

import { Command } from '@node-ts/bus-messages'
import { injectable } from 'inversify'

@injectable()
export class SpecificationUpserted extends Command {
  $name = 'specifications/upserted';
  $version = 1;
  
  constructor (
    readonly title: string,
    readonly message: string,
  ) {
    super()
  }
}