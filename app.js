var TwitterPackage = require('twitter');

var utils = require('./utils');

var secret = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
}


var Twitter = new TwitterPackage(secret);

Twitter.post('statuses/update', {
  status: utils.buildStatus()
}, function(error, tweet, response){
  if(error){
    console.log(error);
  }
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});
