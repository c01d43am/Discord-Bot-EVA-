const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

if (context.params.event.content.startsWith('-flower')) {
  let user = context.params.event.content.split(' ')[1];

  if (!user) {
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `You must tag a user to give him or her a Flower!`,
    });
  } else if (user) {
    let message = await lib.discord.channels['@0.3.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `${context.params.event.author.username} gave ${user} a Flower ❤️🌹!`,
    });
    await lib.discord.channels['@0.3.0'].messages.create({
      channel_id: `${process.env.Log_Channel}`,
      content: `https://discord.com/channels/${context.params.event.guild_id}/${message.channel_id}/${message.id}`,
    });
  }
}