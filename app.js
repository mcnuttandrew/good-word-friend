var TwitterPackage = require('twitter');

var secret = {
  consumer_key: 'xxx',
  consumer_secret: 'xxx',
  access_token_key: 'xxx',
  access_token_secret: 'xxx'
}

var Twitter = new TwitterPackage(secret);

Twitter.post('statuses/update', {status: 'Hiya world!'},  function(error, tweet, response){
  if(error){
    console.log(error);
  }
  console.log(tweet);  // Tweet body.
  console.log(response);  // Raw response object.
});
