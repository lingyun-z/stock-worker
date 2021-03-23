import { syncHistoryStockData } from './worker';
import * as amqplib from 'amqplib';

export const main = (msg: amqplib.ConsumeMessage | null) => {
  const message = JSON.parse(msg.content.toString());
  console.log(message);
  switch (message.method) {
    case 'syncHistoryStockData':
      syncHistoryStockData(message.data);
      break;
  }
};
