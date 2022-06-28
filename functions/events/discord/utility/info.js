const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const {Tools} = require('autocode-discordjs');

if (context.params.event.content.startsWith('-whois')) {
  const ID = context.params.event.mentions[0]
    ? context.params.event.mentions[0].id
    : context.params.event.author.id;
  const member = await lib.discord.guilds['@0.1.0'].members.retrieve({
    user_id: ID, // required
    guild_id: context.params.event.guild_id,
  });

  await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: context.params.event.channel_id,
    content: ``,
    embed: {
      author: {name: member.user.username, icon_url: member.user.avatar_url},
      color: 0x00ff00,
      thumbnail: {url: member.user.avatar_url},
      description: `• **ID**: \`${member.user.id}\`\n• **Discriminator**: \`#${
        member.user.discriminator
      }\`
      • **Is Bot**: ${member.user.bot ? 'Yes' : 'No'}\n• **Nickname**: ${
        member.nick ? member.nick : 'None'
      }\n• **Joined At**: \`${new Date(member.joined_at)}\``,
      fields: [
        {
          name: 'Roles',
          value: member.roles.length
            ? member.roles.map((x) => `<@&${x}>`).join(' ')
            : 'No Roles',
        },
        {
          name: 'Badges',
          value: member.user.public_flags
            ? Tools.getUserBadges(member.user.public_flags)
                .map((x) => `**\`${x}\`**`)
                .join(' | ')
            : 'No Badges',
        },
      ],
    },
  });
}
