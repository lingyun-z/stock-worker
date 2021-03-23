import * as dotenv from 'dotenv';
dotenv.config();

import { main } from './main';

import { AmqpCustomer } from './customer';

export const customer = new AmqpCustomer(
  process.env.MQ_ADDRESS,
  process.env.MQ_QUEUE_NAME,
  main,
);

customer.connect();
