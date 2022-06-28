const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let reason = context.params.event.content.split(' ').slice(1).join(' ');
let message = context.params.event.content;

if (context.params.event.member.roles.includes('ADMIN_ROLE_ID')) {
  if (message.startsWith('-lock')) {
    await lib.discord.channels['@0.1.1'].permissions.update({
      overwrite_id: `${context.params.event.guild_id}`,
      channel_id: `${context.params.event.channel_id}`,
      deny: `${6 << 10}`,
      type: 0,
    });

    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: '',
      tts: false,
      embed: {
        type: 'rich',
        title: '✅ | This channel is now succesfully locked!',
        description: `:lock: ${reason}`,
        color: 0x213232,
      },
    });
  }

  if (message.startsWith('-unlock')) {
    await lib.discord.channels['@0.1.1'].permissions.update({
      overwrite_id: `${context.params.event.guild_id}`,
      channel_id: `${context.params.event.channel_id}`,
      allow: `${6 << 10}`,
      type: 0,
    });

    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: '',
      tts: false,
      embed: {
        type: 'rich',
        title: '✅ | This channel is now succesfully unlocked!',
        description: `:lock: ${reason}`,
        color: 0x213232,
      },
    });
  }
}