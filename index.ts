// import { TweetBookmarksTimelineV2Paginator, TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import needle from 'needle';
import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';

(async ()=>{
  dotenv.config()

  const token = process.env.TT_BEARER || ''
  const streamURL = 'https://api.twitter.com/2/tweets/search/stream?expansions=referenced_tweets.id&tweet.fields=attachments';

  const stream = needle.get(streamURL, {
    headers: {
        "User-Agent": "v2FilterStreamJS",
        "Authorization": `Bearer ${token}`
    },
    timeout: 2000
});

const transform = new Transform({
  transform(chunk, enc, callback) {
    const jsonData = chunk.toString();
    console.log(jsonData);
    return callback(null, jsonData)
  }
})

await pipeline(
  stream,
  transform
)
})()