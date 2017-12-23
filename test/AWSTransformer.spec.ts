/* tslint:disable:no-unused-expression */
import { Callback } from "aws-lambda";
import * as Chai from "chai";
import { IRawCallback, IRawEvent } from "lambda-framework";
import AWSRawCallback from "./../src/lib/AWSRawCallback";
import AWSTransformer from "./../src/lib/AWSTransformer";
import aPIGatewayEvent from "./utils/aPIGatewayEvent";

/**
 * Test for AWSTransformer.
 */
describe("AWSTransformer", () => {
  const transformer: AWSTransformer = new AWSTransformer();

  describe("#transformRawEvent", () => {

    it("creates a raw event with the original event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent(aPIGatewayEvent);

      Chai.expect(rawEvent.original).to.be.equal(aPIGatewayEvent);
    });

    it("creates a raw event with `is http` to false if it isn't a HTTP event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent({});

      Chai.expect(rawEvent.isHttp).to.be.false;
    });

    it("creates a raw event with `is http` to true if it's a HTTP event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent(aPIGatewayEvent);

      Chai.expect(rawEvent.isHttp).to.be.true;
    });

    it("creates a raw event with the body, headers, params, IP, path and HTTP method if it's a HTTP event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent(aPIGatewayEvent);

      Chai.expect(rawEvent.body).to.be.equal(aPIGatewayEvent.body);
      Chai.expect(rawEvent.headers).to.be.equal(aPIGatewayEvent.headers);
      Chai.expect(rawEvent.queryParams).to.be.equal(aPIGatewayEvent.queryStringParameters);
      Chai.expect(rawEvent.stageVariables).to.be.equal(aPIGatewayEvent.stageVariables);
      Chai.expect(rawEvent.ip).to.be.null;
      Chai.expect(rawEvent.path).to.be.equal(aPIGatewayEvent.path);
      Chai.expect(rawEvent.httpMethod).to.be.equal(aPIGatewayEvent.httpMethod);
    });

    it("creates a raw event without the body, headers, params, IP, path and HTTP method if it isn't a HTTP event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent({});

      Chai.expect(rawEvent.body).to.be.undefined;
      Chai.expect(rawEvent.headers).to.be.undefined;
      Chai.expect(rawEvent.queryParams).to.be.undefined;
      Chai.expect(rawEvent.stageVariables).to.be.undefined;
      Chai.expect(rawEvent.ip).to.be.undefined;
      Chai.expect(rawEvent.path).to.be.undefined;
      Chai.expect(rawEvent.httpMethod).to.be.undefined;
    });

    it("creates a raw event with the right event type if it's `APIGatewayEvent` event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent(aPIGatewayEvent);

      Chai.expect(rawEvent.type).to.be.equal("APIGatewayEvent");
    });

    it("creates a raw event with the right event type if it's `CustomAuthorizerEvent` event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent({authorizationToken: "1234"});

      Chai.expect(rawEvent.type).to.be.equal("CustomAuthorizerEvent");
    });

    it("creates a raw event with the right event type if it's `SNSEvent` event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent({Records: [{Sns: ""}]});

      Chai.expect(rawEvent.type).to.be.equal("SNSEvent");
    });

    it("creates a raw event with the right event type if it's `S3CreateEvent` event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent({Records: [{s3: ""}]});

      Chai.expect(rawEvent.type).to.be.equal("S3CreateEvent");
    });

    it("creates a raw event with the right event type if it's `KinesisEvent` event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent({Records: [{kinesis: ""}]});

      Chai.expect(rawEvent.type).to.be.equal("KinesisEvent");
    });

    it("creates a raw event with the right event type if it's `DynamoDbEvent` event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent({Records: [{dynamodb: ""}]});

      Chai.expect(rawEvent.type).to.be.equal("DynamoDbEvent");
    });

    it("creates a raw event with the right event type if it's `CognitoUserPoolEvent` event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent({triggerSource: ""});

      Chai.expect(rawEvent.type).to.be.equal("CognitoUserPoolEvent");
    });

    it("creates a raw event with the right event type if it's `CloudFormationCustomResourceCreateEvent` event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent({RequestType: "Create"});

      Chai.expect(rawEvent.type).to.be.equal("CloudFormationCustomResourceCreateEvent");
    });

    it("creates a raw event with the right event type if it's `CloudFormationCustomResourceUpdateEvent` event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent({RequestType: "Update"});

      Chai.expect(rawEvent.type).to.be.equal("CloudFormationCustomResourceUpdateEvent");
    });

    it("creates a raw event with the right event type if it's `CloudFormationCustomResourceDeleteEvent` event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent({RequestType: "Delete"});

      Chai.expect(rawEvent.type).to.be.equal("CloudFormationCustomResourceDeleteEvent");
    });

    it("creates a raw event with the right event type if it's `CloudFormationCustomResourceSuccessResponse` event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent({Status: "SUCCESS"});

      Chai.expect(rawEvent.type).to.be.equal("CloudFormationCustomResourceSuccessResponse");
    });

    it("creates a raw event with the right event type if it's `CloudFormationCustomResourceFailedResponse` event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent({Status: "FAILED"});

      Chai.expect(rawEvent.type).to.be.equal("CloudFormationCustomResourceFailedResponse");
    });

    it("creates a raw event with the right event type if it's `ScheduledEvent` event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent({time: ""});

      Chai.expect(rawEvent.type).to.be.equal("ScheduledEvent");
    });

    it("creates a raw event with null event type if the event has a unknown Record.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent({Records: [{unknown: ""}]});

      Chai.expect(rawEvent.type).to.be.null;
    });

    it("creates a raw event with null event type if the event has a unknown Cloud Formation event.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent({RequestType: "Unknown"});

      Chai.expect(rawEvent.type).to.be.null;
    });

    it("creates a raw event with null event type if the event has a unknown Cloud Formation event result.", () => {
      const rawEvent: IRawEvent = transformer.transformRawEvent({Status: "Unknown"});

      Chai.expect(rawEvent.type).to.be.null;
    });

  });

  describe("#transformRawCallback", () => {

    it("returns undefined if the given `callback` is undefined.", () => {
      const rawCallback: IRawCallback = transformer.transformRawCallback(undefined);

      Chai.expect(rawCallback).to.be.null;
    });

    it("returns an `AWSRawCallback` if the given `callback` isn't undefined.", () => {
      const callback: Callback = (err, succ) => console.log("OK");
      const rawCallback: IRawCallback = transformer.transformRawCallback(callback);

      Chai.expect(rawCallback).to.be.instanceOf(AWSRawCallback);
    });

  });

});
