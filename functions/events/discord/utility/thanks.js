const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

if (context.params.event.content.startsWith('-thanks')) {
  let userString = context.params.event.content.split(' ')[1];
  let reason =
    context.params.event.content.split(' ').slice(2).join(' ') ||
    'Reason for thanking him not provided !';
  if (!userString || !userString.match(/<@.*>/)) {
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `You must tag a user to **Thank** him/her.`,
    });
    return;
  }
  await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Successfully gave Thanks!`,
    embed: {
      type: 'rich',
      title: 'Reason',
      description: ':hearts:  ' + reason,
      color: 0xf700ff,
    },
  });
  await lib.discord.users['@0.1.3'].dms.create({
    recipient_id: `${userString}`,
    content: `<@!${context.params.event.author.id}> Gave you a heartfull of thanks!`,
    embed: {
      type: 'rich',
      title: 'Reason',
      description: ':hearts: ' + reason,
      color: 0xf700ff,
    },
  });
}