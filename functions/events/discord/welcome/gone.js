// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Only respond to messages containing 
if (context.params.event.content.match(/bye|gtg|see ya|brb/i)) {
  let messageContent = context.params.event.content.match(/bye|gtg|see ya|brb/i);

  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: 'okay ! see ya soon am all here',
    message_reference: {
      message_id: context.params.event.id
    }
  });
}