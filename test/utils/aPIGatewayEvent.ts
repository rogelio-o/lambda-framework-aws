import { APIGatewayEvent } from "aws-lambda";

/**
 * APIGatewayEvent event
 */
const aPIGatewayEvent: APIGatewayEvent = {
  body: "BODY",
  headers: {header1: "header value 1"},
  httpMethod: "POST",
  isBase64Encoded: false,
  path: "/test",
  pathParameters: {},
  queryStringParameters: {},
  stageVariables: {},
  requestContext: null,
  resource: "RESOURCE"
};

export default aPIGatewayEvent;
