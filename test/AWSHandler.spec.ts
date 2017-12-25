/* tslint:disable:no-unused-expression */
import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import * as Chai from "chai";
import { App, IApp, RawEvent } from "lambda-framework";
import { SinonStub, stub } from "sinon";
import AWSHandler from "./../src/lib/AWSHandler";
import AWSRawCallback from "./../src/lib/AWSRawCallback";
import aPIGatewayEvent from "./utils/aPIGatewayEvent";

/**
 * Test for AWSHandler.
 */
describe("AWSHandler", () => {
  const event: APIGatewayEvent = aPIGatewayEvent;
  const context: Context = null;
  const callback: Callback = null;
  const app: IApp = new App();
  const appHandle: SinonStub = stub(app, "handle");
  const handler: AWSHandler = new AWSHandler(app);

  afterEach(() => {
    appHandle.reset();
  });

  describe("#handle", () => {

    it("calls the app `handle` method with a raw event and a raw callback.", () => {
      handler.handle(event, context, callback);

      Chai.expect(appHandle.args[0][0]).instanceOf(RawEvent);
      Chai.expect(appHandle.args[0][1]).instanceOf(AWSRawCallback);
    });

  });

});
