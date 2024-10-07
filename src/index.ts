import api from './api/CodexApi';
import bus from './bus/CodexBus';
import { Container } from 'inversify'

const PORT = process.env.PORT || 3000;

async function start() {
  const container = new Container()

  await bus.start(container);
  await api.start();
}

start();
