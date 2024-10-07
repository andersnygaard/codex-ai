// reserve-room.ts

import { Command } from '@node-ts/bus-messages'
import { injectable } from 'inversify'

@injectable()
export class SpecificationValidated extends Command {
  $name = 'specifications/validated';
  $version = 1;

  constructor (
    readonly title: string,
    readonly content: string
  ) {
    super()
  }
}