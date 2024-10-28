import { Command } from '@node-ts/bus-messages'
import { injectable } from 'inversify'

@injectable()
export class LocationFoundCommand extends Command {
  $name = 'locationScout/locationFound';
  $version = 1;
  
  constructor (
    readonly locationDescription: string
  ) {
    super()
  }
}