// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

// Only respond to messages containing "hi", "hey", "hello", or "sup"
if (context.params.event.content.match(/stupid|bitch|baka|dum|idiot/i)) {
  let messageContent = context.params.event.content.match(/stupid|bitch|baka|dum|idiot/i);

  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: 'https://tenor.com/view/gojo-jujutsu-kaisen-gojo-satoru-anime-funny-as-hell-gif-21514549',
    message_reference: {
      message_id: context.params.event.id
    }
  });
}