/* tslint:disable:no-unused-expression */
import * as S3 from "aws-sdk/clients/s3";
import * as Chai from "chai";
import { ITemplate, ITemplateLoader, Template } from "lambda-framework";
import * as NodeCache from "node-cache";
import { SinonStub, stub } from "sinon";
import S3TemplateLoader from "./../src/lib/S3TemplateLoader";

/**
 * Test for S3TemplateLoader.
 */
describe("S3TemplateLoader", () => {
  const getCacheStub: SinonStub = stub(NodeCache.prototype, "get");
  const getObjectStub: SinonStub = stub(S3.prototype, "makeRequest").withArgs("getObject");
  const loader: ITemplateLoader = new S3TemplateLoader("bucket", 30000);

  afterEach(() => {
    getObjectStub.reset();
    getCacheStub.reset();
  });

  describe("#load", () => {
    it("should load from cache the template if has been previously loaded and run the callback with the cached content.", (done) => {
      getCacheStub.callsFake((key: string, callback) => {
        callback(null, new Template("prueba.pug", "Cached content."));
      });
      loader.load("prueba.pug", (err: Error, template: ITemplate) => {
        Chai.expect(getCacheStub.calledOnce).to.be.true;
        Chai.expect(getObjectStub.calledOnce).to.be.false;
        Chai.expect(template.fileName).to.be.equal("prueba.pug");
        Chai.expect(template.content).to.be.equal("Cached content.");
        done();
      });
    });

    it("should call the `callback` with an error if an error happens getting the template from the cache.", (done) => {
      const returnedError: Error = new Error("Test error.");
      getCacheStub.callsFake((key: string, callback) => {
        callback(returnedError, null);
      });
      loader.load("prueba.pug", (err: Error, template: ITemplate) => {
        Chai.expect(err).to.be.equal(returnedError);
        done();
      });
    });

    it("should load from S3 if the cache is not defined and run the callback with the content.", (done) => {
      const newLoader: ITemplateLoader = new S3TemplateLoader("bucket", null);
      getObjectStub.callsFake((operation: string, params?: {[key: string]: any}, callback?: (err: Error, data: any) => void) => {
        callback(null, {
          Body: "Test content."
        });
      });
      newLoader.load("prueba.pug", (err: Error, template: ITemplate) => {
        Chai.expect(getObjectStub.called).to.be.true;
        Chai.expect(template.fileName).to.be.equal("prueba.pug");
        Chai.expect(template.content).to.be.equal("Test content.");
        done();
      });
    });

    it("should load from S3 if the template has not been previously loaded.", (done) => {
      getObjectStub.callsFake((operation: string, params?: {[key: string]: any}, callback?: (err: Error, data: any) => void) => {
        callback(null, {
          Body: "Test content."
        });
      });
      getCacheStub.callsFake((key: string, callback) => {
        callback(null, undefined);
      });
      loader.load("prueba.pug", (err: Error, template: ITemplate) => {
        Chai.expect(getCacheStub.called).to.be.true;
        Chai.expect(getObjectStub.called).to.be.true;
        Chai.expect(template.fileName).to.be.equal("prueba.pug");
        Chai.expect(template.content).to.be.equal("Test content.");
        done();
      });
    });

    it("should call the `callback` with an error if an error happens getting the template from S3.", (done) => {
      const returnedError: Error = new Error("Test error.");
      getObjectStub.callsFake((operation: string, params?: {[key: string]: any}, callback?: (err: Error, data: any) => void) => {
        callback(returnedError, null);
      });
      getCacheStub.callsFake((key: string, callback) => {
        callback(null, undefined);
      });
      loader.load("prueba.pug", (err: Error, template: ITemplate) => {
        Chai.expect(err).to.be.equal(returnedError);
        done();
      });
    });
  });

});
