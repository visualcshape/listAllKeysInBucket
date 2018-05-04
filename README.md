# AWS LIST ALL KEY IN BUCKET

A simple script to list all keys in the AWS S3 bucket. I will add batch output sooner or later so it can list even bigger bucket.
You may know that LIST in AWS requires $$.

## Installation

```
npm install
```


## API Usage

You should `AWS.config.loadFromPath(credentialPath)` before using.

` listAllKeysInBucket(bucketName, callback, options) `

> `bucketName`: The bucket name you want to list

> `callback`: a callback function which looks like `function (err, results)` . where results has two properties: {bucketName: String, keys: String[]}.

> `options`: reserved for future use.
