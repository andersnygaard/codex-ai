import { Bus, BusInstance, ClassConstructor, InMemoryPersistence, Workflow } from '@node-ts/bus-core';
import { Command } from '@node-ts/bus-messages';
import { Container, decorate, injectable } from 'inversify';
import findLocationCommandHandler from '../agents/locationScout/handles/findLocation';
import describeSceneCommandHandler from '../agents/screenWriter/handles/describeScene';
import getDialogCommandHandler from '../agents/screenWriter/handles/getDialog';
import dialogCreatedCommandHandler from '../agents/storyConsultant/handles/dialogCreated';
import startSceneCommandHandler from '../agents/storyConsultant/handles/startScene';
import sceneDescribedCommandHandler from '../agents/storyConsultant/handles/sceneDescribed';
import locationFoundCommandHandler from '../agents/storyConsultant/handles/locationFound';

class CodexBus {
  private bus!: BusInstance;
  
  constructor() {
    
  }

  public async start(container: Container) {

    decorate(injectable(), Workflow)
    container.bind(BusInstance).toDynamicValue(() => this.bus)
    
    const config = Bus.configure()
      .withHandler(findLocationCommandHandler)
      .withHandler(describeSceneCommandHandler)
      .withHandler(sceneDescribedCommandHandler)
      .withHandler(getDialogCommandHandler)
      .withHandler(dialogCreatedCommandHandler)
      .withHandler(startSceneCommandHandler)
      .withHandler(locationFoundCommandHandler)
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
