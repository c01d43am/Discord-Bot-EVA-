const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const axios = require('axios');

if (context.params.event.content.startsWith('-trace')) {
  let image = context.params.event.content.split(' ').slice(1)[0];
  if (!image && context.params.event.attachments.length)
    image = context.params.event.attachments[0].url;
  if (!image)
    return lib.discord.channels['@0.2.0'].messages.create({
      content: `Please provide the anime scene image which you want to trace.`,
      channel_id: context.params.event.channel_id,
    });

  const traceDetails = await axios(
    `https://api.trace.moe/search?url=${encodeURIComponent(image)}`
  )
    .then((res) => res.data)
    .catch((err) => {
      return lib.discord.channels['@0.2.0'].messages.create({
        content: `Unable to trace the image!`,
        channel_id: context.params.event.channel_id,
      });
    });

  if (!traceDetails.result.length)
    return lib.discord.channels['@0.2.0'].messages.create({
      content: `No results founds related to given image.`,
      channel_id: context.params.event.channel_id,
    });

  const animeResult = traceDetails.result[0];
  const animeDetails = await axios
    .post(`https://graphql.anilist.co`, {
      query: `query ($id: Int) {
      Media(id: $id, type: ANIME) {
        title {
          english
        }
        coverImage {
          large
          color
        }
        status
        episodes
        description
        bannerImage
      }
    }`,
      variables: {id: animeResult.anilist},
    })
    .then((res) => (res.data ? res.data.data.Media : null))
    .catch((err) => {});

  return lib.discord.channels['@0.2.0'].messages.create({
    content: ``,
    embed: {
      title: animeDetails.title.english,
      description:
        animeDetails.description.substring(0, 200) +
        ` **[[Read More](https://anilist.co/anime/${animeResult.anilist})]**`,
      fields: [
        {
          name: `Traced Image/Video`,
          value: `EP. ${animeResult.episode} [Video Clip](${animeResult.video}) | [Image](${animeResult.image})`,
          inline: true,
        },
        {
          name: `Status`,
          value: `${animeDetails.episodes} Episodes | ${animeDetails.status}`,
          inline: true,
        },
      ],
      image: {url: animeDetails.bannerImage},
      color: animeDetails.coverImage.color
        ? parseInt(animeDetails.coverImage.color.replace('#', '0x'))
        : 0xffffff,
      thumbnail: {url: animeDetails.coverImage.large || animeResult.image},
    },
    channel_id: context.params.event.channel_id,
  });
}
