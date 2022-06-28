const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const axios = require('axios');

if (context.params.event.content.startsWith('-blush')) {
  const author = context.params.event.mentions.length
    ? context.params.event.mentions[0]
    : context.params.event.author;
  const {data} = await axios('https://api.waifu.pics/sfw/blush');

  await lib.discord.channels['@0.1.2'].messages.create({
    channel_id: context.params.event.channel_id,
    content:
      author.id === context.params.event.author.id
        ? `<@${author.id}> blushing themselves because they are lonely :C`
        : `<@${context.params.event.author.id}> blushing <@${author.id}>`,
    embed: {
      image: {url: data.url},
      color: 0xffc0cb,
    },
  });
}

/*const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const axios = require('axios');

if (context.params.event.content.startsWith('-blush')) {
  const image = await axios('https://api.waifu.pics/sfw/blush').then((res) =>
    res.data ? res.data.url : null
  );

  if (!image)
    return lib.discord.channels['@0.2.0'].messages.create({
      content: `Oops sorry , something is wrong`,
      channel_id: context.params.event.channel_id,
    });

  await lib.discord.channels['@0.2.0'].messages.create({
    content: ``,
    channel_id: context.params.event.channel_id,
    embed: {
      image: {url: image},
      color: 0xffc0cb,
    },
  });
}
*/
