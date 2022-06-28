const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const translate = require('@iamtraction/google-translate');

if (
  context.params.event.content.startsWith(`-translate`)
) {
  let target = context.params.event.content.split(' ')[1];
  let text = context.params.event.referenced_message.content;

  const translated = await translate(text, {to: target});
  let original = new Intl.DisplayNames(['en'], {type: 'language'}).of(
    translated.from.language.iso
  );

  let targetlanguage = new Intl.DisplayNames(['en'], {type: 'language'}).of(
    target
  );

  let message = await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `"${translated.text}" \n\n ^Message translated from ${original} into **${targetlanguage}**`, //You can change this if you would like, but to get your translated message you must have: ${translated.text}
  });

  await lib.discord.channels['@0.1.2'].messages.destroy({
    message_id: `${context.params.event.id}`,
    channel_id: `${context.params.event.channel_id}`,
  });
}
