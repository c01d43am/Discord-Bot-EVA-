//stilnot yet fixed

/*const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let guild = await lib.discord.guilds['@0.2.2'].list({
  limit: 200,
});
for (let i = 0; i < guild.length; i++) {
  let channels = await lib.discord.guilds['@0.2.2'].channels.list({
    guild_id: `${guild[i].id}`,
  });
  for (let a = 0; a < channels.length; a++) {
    try {
      await lib.discord.channels['@0.3.0'].messages.create({
        channel_id: `${channels[a].id}`,
        content: `Some Stuff Here`,
      });
      break;
    } catch (e) {}
  }
}*/
