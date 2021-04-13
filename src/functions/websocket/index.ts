import { handlerPath } from '@libs/handlerResolver';


export const connect = {
  handler: `${handlerPath(__dirname)}/handler.connect`,
  events: [
    {
      websocket: '$connect'
    }
  ]
};
