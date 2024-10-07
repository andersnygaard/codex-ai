// reserve-room.ts

import { Command } from '@node-ts/bus-messages'
import { injectable } from 'inversify'

@injectable()
export class SpecificationGraded extends Command {
  $name = 'specifications/graded';
  $version = 1;
  
  constructor (
    readonly grade: number,
  ) {
    super()
  }
}