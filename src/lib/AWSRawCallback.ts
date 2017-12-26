import { Callback } from "aws-lambda";
import { IRawCallback } from "lambda-framework";

/**
 * The RAW callback implementation for AWS Lambda.
 */
export default class AWSRawCallback implements IRawCallback {

  private callback: Callback;

  constructor(callback: Callback) {
    this.callback = callback;
  }

  public sendError(error: Error): void {
    this.callback(error, null);
  }

  public send(statusCode: number, headers: {[name: string]: string|string[]}, body: object|Buffer): void {
    this.callback(null, {statusCode, headers, body});
  }

  public finalize(err?: Error): void {
    this.callback(err);
  }

}
