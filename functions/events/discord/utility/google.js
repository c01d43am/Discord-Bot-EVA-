const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let search = context.params.event.content.split(' ').splice(1).join('%20');
let result = `https://www.google.com/search?q=${search}`
let message = context.params.event.content;

if(message.startsWith(`-google`)) {
  await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: ``,
  embed: {
    title: `Here is your link.`,
    description: ``,
    url: `https://www.google.com/search?q=${search}`,
    color: 0x00AA00,
    thumbnail: {
      url: `https://developers.google.com/search/podcasts/search-off-the-record/images/search-off-the-record-logo.png`, // You may change this to whatever picture you want
      height: 0,
      width: 0,
      }
    }
  });
      }