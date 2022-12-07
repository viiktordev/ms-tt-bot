// import { TweetBookmarksTimelineV2Paginator, TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import needle from 'needle';
import { pipeline } from 'node:stream/promises';
import { Transform, Writable } from 'node:stream';
import { SQS } from 'aws-sdk';

dotenv.config();

import { stickerQueueUrl, token, streamURL } from './config';

(async ()=>{
  const sqs = new SQS({ apiVersion: '2012-11-05', region: 'us-east-1' });

  const stream = needle.get(streamURL, {
    headers: {
        'User-Agent': 'v2FilterStreamJS',
        'Authorization': `Bearer ${token}`
    },
    timeout: 2000
  });

  const transform = new Transform({
    transform(chunk, enc, callback) {
      const jsonData = chunk.toString();
      console.log(jsonData);
      return callback(null, jsonData)
    }
  });

  const sendToQueue = new Writable({
    async write(chunk, enc, callback) {
      if(chunk.length > 2) {
        await sqs.sendMessage({
          QueueUrl: stickerQueueUrl,
          MessageBody: chunk.toString('utf-8')
        }).promise();
      }

      callback()
    }
  });

  await pipeline(
    stream,
    transform,
    sendToQueue
  );
})()