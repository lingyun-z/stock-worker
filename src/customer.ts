import * as amqplib from 'amqplib';

export class AmqpCustomer {
  conn: amqplib.Connection;
  channel: amqplib.Channel;
  queue: string;
  connectionstring: string;
  status: amqplib.Replies.AssertQueue;
  messageCallback: (msg: amqplib.ConsumeMessage | null) => void;

  constructor(
    connectionstring: string,
    queue: string,
    callback: (msg: amqplib.ConsumeMessage | null) => void,
  ) {
    this.queue = queue;
    this.connectionstring = connectionstring;
    this.messageCallback = callback;
  }

  async connect() {
    this.conn = await amqplib.connect(this.connectionstring);
    this.channel = await this.conn.createChannel();
    this.status = await this.channel.assertQueue(this.queue, {
      durable: false,
    });
    await this.channel.consume(this.queue, this.messageCallback, {
      noAck: true,
    });
  }
}
