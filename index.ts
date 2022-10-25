// import { TweetBookmarksTimelineV2Paginator, TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import needle from 'needle';


(async ()=>{
  dotenv.config()

  const token = process.env.TT_BEARER || ''
  const appKey = process.env.TT_API_KEY || ''
  const appSecret = process.env.TT_SECRET || ''
  const streamURL = 'https://api.twitter.com/2/tweets/search/stream';

  // console.log({bearer});
  
  // const twiterClient = new TwitterApi(bearer)
  
  // await twiterClient.v2.tweet('test')

  const stream = needle.get(streamURL, {
    headers: {
        "User-Agent": "v2FilterStreamJS",
        "Authorization": `Bearer ${token}`
    },
    timeout: 2000
});

stream.on('data', data => {
  const parsed = data.toString('utf-8');
  console.log(parsed);
    
}).on('err', error => {
    console.log(error);
    })

})()