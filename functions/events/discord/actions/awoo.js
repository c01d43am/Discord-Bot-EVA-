const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const axios = require('axios');

if (context.params.event.content.startsWith('-awoo')) {
  const author = context.params.event.mentions.length
    ? context.params.event.mentions[0]
    : context.params.event.author;
  const {data} = await axios('https://api.waifu.pics/sfw/awoo');

  await lib.discord.channels['@0.1.2'].messages.create({
    channel_id: context.params.event.channel_id,
    content:
      author.id === context.params.event.author.id
        ? `<@${author.id}> they are lonely :C`
        : `<@${context.params.event.author.id}> awoo <@${author.id}>`,
    embed: {
      image: {url: data.url},
      color: 0xffc0cb,
    },
  });
}