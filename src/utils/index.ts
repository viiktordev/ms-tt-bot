
interface Tweet {
  tweetId: string,
  referencedTweetId: string,
  authorId: string,
  imgUrl: string,
}

const parseTweet = (tweet: any): Tweet => {
  return {
    tweetId: tweet.id,
    referencedTweetId: tweet.referenced_tweets[0]?.id,
    authorId: tweet.author_id,
    imgUrl: tweet.url,
  }
}

export { parseTweet }