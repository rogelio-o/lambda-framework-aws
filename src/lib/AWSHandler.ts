import { Callback, Context } from "aws-lambda";
import { IApp, IRawCallback, IRawEvent } from "lambda-framework";
import AWSTransformer from "./AWSTransformer";

/**
 * The class that implements the AWS handler.
 */
export default class AWSHandler {

  private _app: IApp;
  private _transformer: AWSTransformer;

  constructor(app: IApp) {
    this._app = app;
    this._transformer = new AWSTransformer();
  }

  public handle(event: any, context: Context, callback: Callback): void {
    const rawEvent: IRawEvent = this._transformer.transformRawEvent(event);
    const rawCallback: IRawCallback = this._transformer.transformRawCallback(callback);

    this._app.handle(rawEvent, rawCallback);
  }

}
