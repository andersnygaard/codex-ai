import webserver from './webserver';
import bus from './bus/CodexBus';
import { Container } from 'inversify'
import messageService from './services/messageService';

const PORT = process.env.PORT || 3000;

async function start() {
  const container = new Container()

  await bus.start(container);
  await webserver.start();
  await messageService.send("OK")
}

start();
