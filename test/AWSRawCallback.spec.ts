/* tslint:disable:no-unused-expression */
import { Callback } from "aws-lambda";
import * as Chai from "chai";
import { SinonSpy, spy } from "sinon";
import AWSRawCallback from "./../src/lib/AWSRawCallback";

/**
 * Test for AWSRawCallback.
 */
describe("AWSRawCallback", () => {
  const callback: SinonSpy = spy();
  const rawCallback: AWSRawCallback = new AWSRawCallback(callback as Callback);

  afterEach(() => {
    callback.reset();
  });

  describe("#sendError", () => {

    it("calls the original `callback` function with the error as first argument and null as second argument.", () => {
      const error: Error = new Error("Produced error.");

      rawCallback.sendError(error);

      Chai.expect(callback.args[0][0]).to.be.equal(error);
      Chai.expect(callback.args[0][1]).to.be.null;
    });

  });

  describe("#send", () => {

    it("calls the original `callback` function with the null as first argument and {statusCode, headers, body} object as second argument.", () => {
      const resultObject = {statusCode: 200, headers: {header1: "value 1"}, body: new Buffer("body")};

      rawCallback.send(resultObject.statusCode, resultObject.headers, resultObject.body);

      Chai.expect(callback.args[0][0]).to.be.null;
      Chai.expect(callback.args[0][1]).to.be.deep.equal(resultObject);
    });

  });

  describe("#finalize", () => {

    it("calls the original `callback` function with the given error.", () => {
      const err: Error = new Error("Test.");

      rawCallback.finalize(err);

      Chai.expect(callback.args[0][0]).to.be.equal(err);
    });

  });

});
