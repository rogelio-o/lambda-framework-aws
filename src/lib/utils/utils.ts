export function getEventType(obj: any): string {
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
