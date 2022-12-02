// import { TweetBookmarksTimelineV2Paginator, TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import needle from 'needle';

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

stream.on('data', data => {
  if(data.length != 2) {
    const parsed = JSON.parse(data.toString('utf-8'));
    console.log(parsed);
    
  }
}).on('err', error => {
    })
})()