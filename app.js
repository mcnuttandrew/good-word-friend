var TwitterPackage = require('twitter');

var secret = {
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  access_token_key: TWITTER_ACCESS_KEY,
  access_token_secret: TWITTER_ACCESS_SECRET
}

var Twitter = new TwitterPackage(secret);
Twitter.post('statuses/update', {status: 'Hiya world!'}, function(error, tweet, response){
  if(error){
    console.log(error);
  }
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});
