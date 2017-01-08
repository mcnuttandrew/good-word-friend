var moment = require('moment');
var nodeEmoji = require('node-emoji').emoji;

var emojis = [
  // 🐘
  'elephant',
  // ☀️
  'sunny',
  // 🗝
  'old_key',
  // 🕕
  'clock6',
  // 👼
  'angel',
  // 🐋
  'whale2',
  // 🐃
  'water_buffalo'
]

var messages = [
  'fate reaches down',
  'calrity shines',
  'truth is revelead',
  'freedom opens',
  'grace consumes us'
];


function buildStatus() {
  var messageIndex = Math.floor(Math.random() * messages.length);
  var days = moment('2017-04-21').diff(moment(), 'days');
  var emoji = nodeEmoji[emojis[Math.floor(Math.random() * emojis.length)]];
  return '@violentstruggle only ' + days + ' days until ' + messages[messageIndex] + ' ' + emoji;
}

module.exports = {
  buildStatus: buildStatus
}
