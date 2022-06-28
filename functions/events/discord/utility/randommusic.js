const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const randomUrlGen = require("random-youtube-music-video");
const youtubeUrl = await randomUrlGen.getRandomMusicVideoUrl();

if (context.params.event.content.startsWith(`-randommusic`)) {

await lib.discord.channels['@0.2.0'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `${youtubeUrl}`,
});
}
console.log(youtubeUrl);