import { APIGatewayEvent, Callback } from "aws-lambda";
import { IRawCallback, IRawEvent, RawEvent } from "lambda-framework";
import AWSRawCallback from "./AWSRawCallback";

/**
 * The class that transform the AWS event and callback to LF raws.
 */
export default class AWSTransformer {

  public transformRawEvent(event: any): IRawEvent {
    const result: IRawEvent = new RawEvent();
    result.type = this.getEventType(event);
    result.original = event;
    result.isHttp = result.type === "APIGatewayEvent";

    if (result.isHttp) {
      const httpEvent: APIGatewayEvent = event as APIGatewayEvent;
      result.body = httpEvent.body;
      result.headers = httpEvent.headers;
      result.queryParams = httpEvent.queryStringParameters;
      result.stageVariables = httpEvent.stageVariables;
      result.ip = httpEvent.requestContext ? httpEvent.requestContext.identity.sourceIp.replace("\:d+$", "") : null;
      result.path = httpEvent.path;
      result.httpMethod = httpEvent.httpMethod;
    }

    return result;
  }

  public transformRawCallback(callback: Callback): IRawCallback {
    if (callback === undefined) {
      return null;
    } else {
      return new AWSRawCallback(callback);
    }
  }

  private getEventType(obj: any): string {
    if ("httpMethod" in obj) {
      return "APIGatewayEvent";
    } else if ("authorizationToken" in obj) {
      return "CustomAuthorizerEvent";
    } else if ("Records" in obj) {
      const obj2 = obj.Records[0] || {};
      if ("Sns" in obj2) {
        return "SNSEvent";
      } else if ("s3" in obj2) {
        return "S3CreateEvent";
      } else if ("kinesis" in obj2) {
        return "KinesisEvent";
      } else if ("dynamodb" in obj2) {
        return "DynamoDbEvent";
      } else {
        return null;
      }
    } else if ("triggerSource" in obj) {
      return "CognitoUserPoolEvent";
    } else if ("RequestType" in obj) {
      const obj2 = obj.RequestType;
      switch (obj2) {
        case "Create":
          return "CloudFormationCustomResourceCreateEvent";
        case "Update":
          return "CloudFormationCustomResourceUpdateEvent";
        case "Delete":
          return "CloudFormationCustomResourceDeleteEvent";
        default:
          return null;
      }
    } else if ("Status" in obj) {
        const obj2 = obj.Status;
        switch (obj2) {
          case "SUCCESS":
            return "CloudFormationCustomResourceSuccessResponse";
          case "FAILED":
            return "CloudFormationCustomResourceFailedResponse";
          default:
            return null;
        }
    } else if ("time" in obj) {
      return "ScheduledEvent";
    } else {
      return null;
    }
  }

}
