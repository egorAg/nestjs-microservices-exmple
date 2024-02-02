import { NatsConnection, StringCodec, connect } from 'nats';

export class NatsClient {
  private _connection: NatsConnection;
  private sc = StringCodec();

  constructor(private _servers: string[]) {
    void this.start();
  }

  private async start() {
    this._connection = await connect({
      servers: this._servers,
    });
  }

  public async send(
    subject: string,
    message: Record<string, any>,
  ): Promise<Record<any, any>> {
    const result = await this._connection.request(
      subject,
      JSON.stringify(message),
      {
        timeout: 5000,
      },
    );

    return JSON.parse(this.sc.decode(result.data));
  }
}
