import axios from 'axios';

import { tweetsURL, twitterToken } from '../config';

const defaultConfig = {
  headers: {
      'User-Agent': 'v2FilterStreamJS',
      'Authorization': `Bearer ${twitterToken}`
  },
  timeout: 2000
};

const getMediaDetails = async (tweetId: string) => {
    const response = await axios.get(
      `${tweetsURL}?expansions=attachments.media_keys&media.fields=url&ids=${tweetId}`,
      defaultConfig
    );
  
    const url = response.data?.includes?.media[0]?.url;

    return url;
}

export { getMediaDetails }