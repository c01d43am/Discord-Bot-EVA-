const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const axios = require('axios');

if (context.params.event.content.startsWith('-hug')) {
  const author = context.params.event.mentions.length
    ? context.params.event.mentions[0]
    : context.params.event.author;
  const {data} = await axios('https://api.waifu.pics/sfw/hug');

  await lib.discord.channels['@0.1.2'].messages.create({
    channel_id: context.params.event.channel_id,
    content:
      author.id === context.params.event.author.id
        ? `<@${author.id}> alone?`
        : `<@${context.params.event.author.id}> want hug <@${author.id}>`,
    embed: {
      image: {url: data.url},
      color: 0xffc0cb,
    },
  });
}
/*const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const axios = require('axios');

if (context.params.event.content.startsWith('-hug')) {
  const author = context.params.event.mentions.length
    ? context.params.event.mentions[0]
    : context.params.event.author;
  const {data} = await axios('https://api.waifu.pics/sfw/hug');

  await lib.discord.channels['@0.1.2'].messages.create({
    channel_id: context.params.event.channel_id,
    content:
      author.id === context.params.event.author.id
        ? `<@${author.id}> hugged themselves because they are lonely :C`
        : `<@${context.params.event.author.id}> hugged <@${author.id}>`,
    embed: {
      image: {url: data.url},
      color: 0xffc0cb,
    },
  });
}
*/