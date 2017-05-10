function buildPostTweet(Twitter) {
  return function postTweet(text) {
    const statusObj = {
      status: text
    };
    console.log(statusObj)
    // call the post function to tweet something
    // Twitter.post('statuses/update', statusObj, (error, tweetReply, response) => {
    //
    //   // if we get an error print it out
    //   if (error) {
    //     console.log(error);
    //   }
    //
    //   // print the text of the tweet we sent out
    //   console.log(tweetReply.text);
    // });
  };
}

function buildBuildListener(Twitter) {
  return function buildListener(track, response) {
    Twitter.stream('statuses/filter', {track}, stream => {
      // ... when we get tweet data...
      stream.on('data', response);

      // ... when we get an error...
      stream.on('error', error => {
        // print out the error
        console.log(error);
      });
    });
  };
}
module.exports = {
  buildPostTweet,
  buildBuildListener
};
