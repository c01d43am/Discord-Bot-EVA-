const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
var randomWords = require('random-words');
console.log(randomWords(5));
['army', 'beautiful', 'became', 'if', 'actually'];
if (context.params.event.content.trim() === `-random`) {
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: ``,
    embed: {
      type: 'rich',
      title: `Make A sentence with:`,
      description:`${randomWords(5)}`, //change this number to the number of words, ${randomWords(5)}=5 words, ${randomWords(10)} = 10 words
      color: 0x2ef303,
    },
  });
}