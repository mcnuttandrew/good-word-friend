const TwitterPackage = require('twitter');
const redis = require('redis');
const TwitterHelpers = require('./twitter-helpers');
const bayes = require('bayes');

/* global process */
const secret = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
};

// const secret = require('../secrets.json');

// create a redius client
const client = redis.createClient(process.env.REDIS_URL);
// const client = redis.createClient();

// if an error occurs, print it to the console
client.on('error', err => console.log(`Error ${err}`));

const classifier = bayes();

// create a twitter client
const Twitter = new TwitterPackage(secret);
const postTweet = TwitterHelpers.buildPostTweet(Twitter);
const buildListener = TwitterHelpers.buildBuildListener(Twitter);

let goodWords = [];
let uglyWords = [];
client.smembers('beautiful-words', (err, words) => {
  if (err) {
    console.log(err);
    return;
  }

  words.forEach(word => classifier.learn(word, 'positive'));
  goodWords = words;
  console.log(goodWords.map(word => word.toLowerCase()).join(','))
  buildBot();
});

client.smembers('ugly-words', (err, words) => {
  if (err) {
    console.log(err);
    return;
  }
  words.forEach(word => classifier.learn(word, 'negative'));
  uglyWords = words;
  buildBot();
});

function buildBot() {
  buildListener(goodWords.map(word => word.toLowerCase()).join(','), tweet => {
    const theGoodWord = goodWords.reduce((acc, word) => {
      if (word) {
        return word;
      }
      return tweet.text.includes(word) ? word : false;
    }, false);

    // print out the text of the tweet that came in
    console.log(theGoodWord, tweet.text);

    const tweetToSend = `$@${tweet.user.screen_name} ${theGoodWord} is one of my favorite words, well said!`;
    console.log(tweetToSend, theGoodWord, tweet.text)
    // postTweet(tweetToSend);
  });

  buildListener('@goodwordfriend', tweet => {
    const userName = tweet.user.screen_name;
    // print out the text of the tweet that came in
    console.log(tweet.text, tweet);
    const brokenUpTweet = tweet.text.split(' ');
    // reject the new word if there is more than one word
    if (brokenUpTweet.length > 2) {
      postTweet(`@${userName}, which word are you referring to?`);
      return;
    }
    // TODO add error handling
    const theWord = brokenUpTweet.filter(word => !word.includes('@'))[0];
    // check the word against the baysian classifier
    const classifierResponse = classifier.categorize(theWord);
    if (classifierResponse === 'positive') {
      postTweet(`Your right @${userName} ! ${theWord} is a good word`);
      return;
    }
    // if it fails tweet
    postTweet(`@${userName}, i do not care for that word!`);

    // either way add it to the appropriate list
    // thus allows for iterative training

  });
}
