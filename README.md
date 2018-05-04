# AWS LIST ALL KEY IN BUCKET

## Installation

```
npm install
```


## API Usage

` listAllKeysInBucket(bucketName, callback) `

> `bucketName`: The bucket name you want to list

> `callback`: a callback function which looks like `function (err, results)` . where results has two property: {bucketName: String, keys: String[]}.