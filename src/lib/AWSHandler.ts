import { Callback, Context } from "aws-lambda";
import { IApp, IRawCallback, IRawEvent } from "lambda-framework";
import AWSTransformer from "./AWSTranformer";

const AWSHandler = (app: IApp) => {
  return (event: any, context: Context, callback: Callback): void => {
    rawEvent: IRawEvent = AWSTransformer.rawEvent(event);
    rawCallback: IRawCallback = AWSTransformer.rawCallback(callback);

    app.handle(rawEvent, rawCallback);
  };
}

export default AWSHandler;
