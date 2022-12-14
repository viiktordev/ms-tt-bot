const stickerQueueUrl = process.env.STICKER_QUEUE_URL || '';
const twitterToken = process.env.TT_BEARER || '';
const streamURL = 'https://api.twitter.com/2/tweets/search/stream?expansions=referenced_tweets.id&tweet.fields=author_id';
const tweetsURL = 'https://api.twitter.com/2/tweets';

export { stickerQueueUrl, twitterToken, streamURL, tweetsURL }