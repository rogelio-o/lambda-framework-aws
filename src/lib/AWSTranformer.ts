import { APIGatewayEvent, Callback } from "aws-lambda";
import { IRawCallback, IRawEvent, RawEvent } from "lambda-framework";
import AWSRawCallback from "./AWSRawCallback";
import { getEventType } from "./utils/utils";

export default {
  rawEvent: (event: any): IRawEvent => {
    const result: IRawEvent = new RawEvent();
    result.type = getEventType(event);
    result.original = event;
    result.isHttp = result.type === "APIGatewayEvent";

    if(result.isHttp) {
      const httpEvent: APIGatewayEvent = event as APIGatewayEvent;
      result.body = httpEvent.body;
      result.headers = httpEvent.headers;
      result.queryParams = httpEvent.queryStringParameters;
      result.stageVariables = httpEvent.stageVariables;
      result.ip = httpEvent.requestContext.identity.sourceIp.replace("\:d+$", "");
      result.path = httpEvent.path;
      result.httpMethod = httpEvent.httpMethod;
    }

    return result;
  },
  rawCallback: (callback: Callback): IRawCallback => {
    if(callback === undefined) {
      return null;
    } else {
      return new AWSRawCallback(callback);
    }
  }
};
