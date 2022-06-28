// A say command get your bot to say something right after you!
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let event = context.params.event;
if (event.content.startsWith(`-repeat`)) {
  let text = event.content.split(` `);
  let suggestion = text.slice(1).join(` `);
  if (!suggestion) {
    await lib.discord.channels['@0.1.0'].messages.create({
      channel_id: event.channel_id,
      content: `What do you want me to say?`,
    });
  } else {
    await lib.discord.channels['@0.1.0'].messages.destroy({
      channel_id: event.channel_id,
      message_id: event.id,
    });
    let suggest = await lib.discord.channels['@0.1.0'].messages.create({
      channel_id: context.params.event.channel_id,
      content: `${suggestion}`,
    });
  }
}