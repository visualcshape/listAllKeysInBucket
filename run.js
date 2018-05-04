const AWS = require('aws-sdk');
const ListAllKeysInBucket = require('./list-all-key-in-bucket');
const fs = require('fs');

AWS.config.loadFromPath('aws-credential.json');

const listAllKeysInBucketCallback = ((err, result)=>{
    if(err){
        console.error(err);
        return;
    }

    console.info(`The bucket ${result.bucketName} has ${result.keys.length} keys.`);
    console.info('Writing keys to the file');
    let data = '';
    for(const aKey of result.keys){
        data += aKey + '\n';
    }
    data = data.slice(0, data.length - 1);
    fs.writeFile('keys.txt', data, err=>{
        if(err){
            console.error('Failed on writing file!');
            console.error(err);
            return;
        }
        console.info('Complete');
    });
});


ListAllKeysInBucket.listAllKeysInBucket('test-object-delete', listAllKeysInBucketCallback);
