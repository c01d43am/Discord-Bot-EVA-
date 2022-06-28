const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

if (context.params.event.content === `-time`) {
  await lib.discord.channels['@0.2.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `The current time is: <t:${Math.round(new Date().getTime() / 1000)}>`,
  });
}