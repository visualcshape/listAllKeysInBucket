'use strict';

const fs = require('fs');

const AWS = require('aws-sdk');

const s3 = new AWS.S3();


/**
 * List all keys in bucket
 * @param {String} bucketName The bucket name want to list
 * @param {*} callback callback function function(err, result)
 * @param {Object} options Reserved for future use
 */
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

module.exports = {
    listAllKeysInBucket: listAllKeysInBucket
};