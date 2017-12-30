# AWS Lambda implementation

[![Coverage Status](https://coveralls.io/repos/github/rogelio-o/lambda-framework-aws/badge.svg?branch=master)](https://coveralls.io/github/rogelio-o/lambda-framework-aws?branch=master) [![Build Status](https://travis-ci.org/rogelio-o/lambda-framework-aws.svg?branch=master)](https://travis-ci.org/rogelio-o/lambda-framework-aws) [![npm version](https://badge.fury.io/js/lambda-framework-aws.svg)](https://badge.fury.io/js/lambda-framework-aws)

AWS Lambda implementation of Lambda Framework.

## How to use it?

### Creating the AWS Lambda handler

```typescript
import { App, IApp, ITemplateRenderer } from "lambda-framework";
import { AWSHandler } from "lambda-framework-aws";

const app: IApp = new App();
...
const handler: AWSHandler = new AWSHandler(app);
export const handle = handler.handle.bind(handler);
```

### Using S3 to retrieve the templates

```typescript
import { App, IApp } from "lambda-framework";
import { AWSHandler, S3TemplateLoader } from "lambda-framework-aws";
import { DustTemplateRenderer } from "lambda-framework-dustjs";

const app: IApp = new App();
...
const cachedTime: number = 3000;
const templateRenderer: ITemplateRenderer = new DustTemplateRenderer(new S3TemplateLoader("bucket-name", cachedTime));
app.addTemplateEngine(templateRenderer);
...
```

### More info

If you want to know more about how to use App, please visit
the [Core Project](https://github.com/rogelio-o/lambda-framework).

## Lambda Framework projects

- [Core](https://github.com/rogelio-o/lambda-framework)
- [AWS Lambda implementation](https://github.com/rogelio-o/lambda-framework-aws)
- [Google Cloud Functions implementation](https://github.com/rogelio-o/lambda-framework-gcloud)
- [DustJS template engine implementation](https://github.com/rogelio-o/lambda-framework-dustjs)
- [Website](https://github.com/rogelio-o/lambda-framework-website)
- [Website Resources](https://github.com/rogelio-o/lambda-framework-website-resources)
- [Examples](https://github.com/rogelio-o/lambda-framework-examples)

## Contributions

All contributors will be welcome. You can contributing by implementing/fixing/answering one open [issue](issues), by suggesting new features for the framework,... For more info about contributing, you can read [the contributing file of the core project](https://github.com/rogelio-o/lambda-framework/CONTRIBUTING.md).

Make it happen.
