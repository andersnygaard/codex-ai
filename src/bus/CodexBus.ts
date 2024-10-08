import { Bus, BusInstance, ClassConstructor, InMemoryPersistence, Workflow } from '@node-ts/bus-core';
import { Command } from '@node-ts/bus-messages';
import { Container, decorate, injectable } from 'inversify';
import changeScriptCommandHandler from './handlers/specifications/changeScriptOutlineCommandHandler';
import generateLocationCommandHandler from './handlers/location/generateLocationCommandHandler';

class CodexBus {
  private bus!: BusInstance;
  
  constructor() {
    
  }

  public async start(container: Container) {

    decorate(injectable(), Workflow)
    container.bind(BusInstance).toDynamicValue(() => this.bus)
    
    const config = Bus.configure()
      .withHandler(changeScriptCommandHandler)
      .withHandler(generateLocationCommandHandler)
      .withPersistence(new InMemoryPersistence())
      .withContainer({
        get <T>(type: ClassConstructor<T>) {
          return container.get<T>(type)
        }
      })
    
    this.bus = config.build();
    
    await this.bus.initialize();
    await this.bus.start();
  }

  public stopBus = () => {
    this.bus.stop();
  }

  public sendMessage = async (message: Command) => {
    await this.bus.send(message);
  }
}

const busInstance = new CodexBus();
export default busInstance;
