const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

if (context.params.event.content.startsWith(`-random_movie`)) {
  const randomMovieNames = require('random-movie-names');

  await lib.discord.channels['@0.2.0'].messages.create({
    content: `${randomMovieNames()}`,
    channel_id: context.params.event.channel_id,
  });

  console.log(randomMovieNames());
}