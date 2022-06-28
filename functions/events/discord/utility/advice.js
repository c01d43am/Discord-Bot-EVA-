const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const somethingRandomOnDiscord = require('something-random-on-discord').Random

//if message starts with !advice
if (context.params.event.content.startsWith('-advice')) {
  /* Get fresh advice right from a tree */
  const { embed } = await somethingRandomOnDiscord.getAdvice()
  /* set embed color to your fav color */
  embed.color = 0xffff00
  /* Send amazing advice with cool embed */
  return await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: context.params.event.channel_id,
    content: ``,
    embed
  });
}
