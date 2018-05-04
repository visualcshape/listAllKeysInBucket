'use strict';

const fs = require('fs');

const AWS = require('aws-sdk');

AWS.config.loadFromPath('aws-credential.json');

const s3 = new AWS.S3();

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

function listAllKeysInBucket(bucketName, callback, options){
    let keyList = null;
    let listParams = {
        Bucket: bucketName
    };
    arguments[3] != null? keyList=arguments[3]:keyList= new Array();
    if(arguments[4] != null){
        listParams['ContinuationToken'] = arguments[4];
    }

    console.info('Number of keys listed: ' + keyList.length);

    s3.listObjectsV2(listParams, (err, data)=>{
        if(err){
            callback(err);
            return;
        }
        const {Name, IsTruncated, NextContinuationToken, Contents} = data;
        const keys = Contents.map(content=>content.Key);
        keyList = keyList.concat(keys);
        
        if(IsTruncated){
            process.nextTick(listAllKeysInBucket, Name, callback, options, keyList, NextContinuationToken);
        }else{
            callback(null, {
                keys: keyList,
                bucketName: Name
            });
        }
    });
}

listAllKeysInBucket('test-object-delete', listAllKeysInBucketCallback);


module.exports = {
    listAllKeysInBucket: listAllKeysInBucket
};