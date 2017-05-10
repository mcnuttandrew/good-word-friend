/* global process */
const redis = require('redis');
const BeautifulWords = require('../base-data/beautiful-words.json');
const UglyWords = require('../base-data/most-common-words.json');

// create a redius client
const client = process.env.NODE_ENV === 'LOCAL' ?
  redis.createClient() :
  redis.createClient(process.env.REDIS_URL);

const multi = client.multi();
// if an error occurs, print it to the console
client.on('error', err => console.log(`Error ${err}`));

// inject a bunch of start data into our base redis sets
const goodPromises = BeautifulWords.map(word => new Promise((resolve, reject) => {
  multi.sadd('beautiful-words', word, redis.print);
  return resolve(word);
}));
const badPromises = UglyWords.map(word => new Promise((resolve, reject) => {
  multi.sadd('ugly-words', word);
  return resolve(word);
}));

Promise.all(goodPromises.concat(badPromises)).then(values => {
  multi.exec(() => client.quit());
}).catch(err => console.log(err));
