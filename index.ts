import dotenv from 'dotenv';
import needle from 'needle';
import { pipeline } from 'node:stream/promises';
import { Transform, Writable } from 'node:stream';
import { SQS } from 'aws-sdk';

dotenv.config();

import { stickerQueueUrl, twitterToken, streamURL } from './src/config';
import { getMediaDetails } from './src/integration/twitter';
import { parseTweet } from './src/utils';

(async ()=>{
  const sqs = new SQS({ apiVersion: '2012-11-05', region: 'us-east-1' });

  const stream = needle.get(streamURL, {
    headers: {
        'User-Agent': 'v2FilterStreamJS',
        'Authorization': `Bearer ${twitterToken}`
    },
    timeout: 2000
  });

  const fillImgUrl = new Transform({
    async transform(chunk, enc, callback) {
      const jsonData = chunk.toString();

      if(chunk.length > 2) {
        const { data } = JSON.parse(jsonData);

        const tweetId = data?.referenced_tweets[0]?.id;

        const url = await getMediaDetails(tweetId);

        const parsedTweet = parseTweet({...data, url});

        return callback(null, JSON.stringify(parsedTweet));
      }

      return callback(null, jsonData);
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

      callback();
    }
  });

  await pipeline(
    stream,
    fillImgUrl,
    sendToQueue
  );
})()