const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

if (context.params.event.content.startsWith(`-afk`)) {
  let content = context.params.event.content;
  let afkReason =
    content.search(' ') !== -1 ? content.split(' ').slice(1).join(' ') : ' ';
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_afk`,
    value: {
      username: context.params.event.author.username,
      reason: afkReason,
    },
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${context.params.event.author.id}_mentioned`,
    value: `0`,
  });
  await lib.discord.channels['@0.1.2'].messages.create({
    channel_id: context.params.event.channel_id,
    content: `I have now set your AFK. To remove your afk say ?unafk.`,
  });
} else if (
  context.params.event.content.startsWith(`-unafk`)
) {
  let result = await lib.utils.kv['@0.1.16'].clear({
    key: `${context.params.event.author.id}_afk`, // required
  });
  let mentioned = await lib.utils.kv['@0.1.16'].get({
    key: `${context.params.event.author.id}_mentioned`,
  });
  await lib.discord.channels['@0.1.2'].messages.create({
    channel_id: context.params.event.channel_id,
    content: `You are no longer **AFK**! While you were away you recived..... ${mentioned} ping(s)! `,
  });
} else if (context.params.event.mentions.length >= 1) {
  let is_afk = await lib.utils.kv['@0.1.16'].get({
    key: `${context.params.event.mentions[0].id}_afk`,
  });
  if (is_afk) {
    await lib.discord.channels['@0.1.0'].messages.create({
      channel_id: context.params.event.channel_id,
      content: `<@!${context.params.event.author.id}>, ${is_afk.username} is **AFK**: ${is_afk.reason} Please wait until they are back!`, //anything can go here.
    });
    let mentioned = await lib.utils.kv['@0.1.16'].get({
      key: `${context.params.event.mentions[0].id}_mentioned`,
    });
    await lib.utils.kv['@0.1.16'].set({
      key: `${context.params.event.author.id}_mentioned`,
      value: parseInt(mentioned, 10) + 1,
    });
  }
}