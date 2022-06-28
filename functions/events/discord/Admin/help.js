const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

if (context.params.event.content.toLowerCase().startsWith(`!help`)) {
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Hey! <@${context.params.event.author.id}> check your Direct Messages :envelope_with_arrow: , I sent you the info.`,
  });
  await lib.discord.users['@0.1.4'].dms.create({
    recipient_id: `${context.params.event.author.id}`,
    content: `test 1 `,
    embed: {
      title: `Help `,
      description: `-----------------------` ,
      color: 0x00ffc3,
      fields: [
        {
          name: `Game`,
          value: [
          `\`Truth\` \`Dare\` \`   \` \`    \` \`      \` \`       \``,
          ].join('\n'),
        },
        {
          name: `Actions Commands`,
          value: [
          `\`Awoo\` \`Bite\` \`Blush\` \`Bonk\` \`Bully\` \`Cheeks\``,
          `\`Cuddle\` \`Cry\` \`Cringe\` \`Dance\` \`Glomp\``,
          `\`Happy\` \`Highfive\` \`Handhold\` \`Kill\` \`Kiss\``,
          `\`Nom\` \`Poke\` \`Slap\` \`Smile\` \`Smug\` \`Wave\``,
          `\`Wave\` \`yeet\``,
          ].join('\n'),
        },
        {
          name: `Utility Commands`,
          value: [
          `\`Ping\` \`Time\` \`Search\` \`Advice\` \`Google\` \`Weather\``,
          `\`Repeat\` \`Afk\` \`Time\` \`Thanks\` \`Tictactoe(ttt)\` \`Whois\``,
          ].join('\n'),
        },
        {
          name: `Actions`,
          value: `what the command can do.`,
        },
        {
          name: `-------`,
          value: `----`,
        },
      ],
    },
  });
}

