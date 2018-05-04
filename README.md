# AWS LIST ALL KEY IN BUCKET

## Installation

```
npm install
```


## API Usage

You should `AWS.config.loadFromPath(credentialPath)` before using.

` listAllKeysInBucket(bucketName, callback, options) `

> `bucketName`: The bucket name you want to list

> `callback`: a callback function which looks like `function (err, results)` . where results has two property: {bucketName: String, keys: String[]}.

> `options`: reserved for future use.
