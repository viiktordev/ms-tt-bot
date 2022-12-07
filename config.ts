const stickerQueueUrl = process.env.STICKER_QUEUE_URL || '';
const token = process.env.TT_BEARER || ''
const streamURL = 'https://api.twitter.com/2/tweets/search/stream?expansions=referenced_tweets.id&tweet.fields=attachments';

export { stickerQueueUrl, token, streamURL }