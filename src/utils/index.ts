
interface Tweet {
  id: string,
  referenced: string,
  author: string,
  imgUrl: string,
}

const parseTweet = (tweet: any): Tweet => {
  return {
    id: tweet.id,
    referenced: tweet.referenced_tweets[0]?.id,
    author: tweet.author_id,
    imgUrl: tweet.url
  }
}

export { parseTweet }