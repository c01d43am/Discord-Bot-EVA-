/*const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const axios = require('axios');

const message = context.params.event.content;
const messageid = context.params.event.id;
const bot_name = 'EVA';
const owner_name = 'c01d43am';
const channel_id = context.params.event.channel_id;

if (context.params.event.channel_id !== channel_id) return;
let returnMsg = await axios(
  `https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message)}&name=${encodeURIComponent(bot_name)}&scmaster=${encodeURIComponent(owner_name)}&master=${encodeURIComponent(owner_name)}&user=${context.params.event.author.id}`
);
returnMsg = returnMsg ? returnMsg.data : false;
if (!returnMsg || !returnMsg.message) return;
await lib.discord.channels['@0.3.2'].typing.create({
  channel_id: context.params.event.channel_id,
});
await lib.discord.channels['@0.1.1'].messages.create({
  channel_id: context.params.event.channel_id,
  content: returnMsg.message,
  message_reference: {
    message_id: context.params.event.id,
  },
});
*/