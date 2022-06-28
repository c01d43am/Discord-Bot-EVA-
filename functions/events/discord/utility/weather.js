// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
try {
  let postal = context.params.event.content.split(' ')[1];

  let weather = await lib.http.request['@1.1.6'].get({
    url: `https://api.weatherapi.com/v1/current.json?key=f9867699b809471caf2153314221203&q=${postal}&aqi=yes`,
    queryParams: {
      q: postal,
    },
  });

  if (!postal.match('')) {
    //console.log(postal)
    await lib.discord.channels['@0.1.1'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `You must provide a postal!`,
      message_reference: {
        message_id: `${context.params.event.id}`,
      },
    });
  } else {
    const d = new Date();
    let time1 = weather.data.location.localtime;
    let localestring = time1.toLocaleString('en-US', {
      timeZone: 'EST',
      hour12: true,
    });
    let currentTime = localestring.slice(11);
    let hour = parseInt(currentTime.slice(0, 2));
    //console.log(hour)
    if (hour >= 12) {
      if (hour === 12) {
        currentTime = `${hour}${currentTime.slice(2)} PM`;
      } else {
        hour = hour - 12;
        currentTime = `${hour}${currentTime.slice(2)} PM`;
      }
    } else {
      currentTime = `${currentTime} AM`;
    }
    //console.log(weather)
    //console.log(weather.data.current.wind_mph)
    //console.log(weather.data)
    //console.log(weather.data.location.name)
    //console.log(localestring.slice(11))
    //console.log(currentTime)
    //console.log(JSON.stringify(weather.data.wind_dir))
    let icon_url = weather.data.current.condition.icon;
    await lib.discord.channels['@0.3.0'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: ``,
      embeds: [
        {
          type: 'rich',
          title: `Weather for ${weather.data.location.name}  @${currentTime}`,
          description: `Region: **${weather.data.location.region}**`,
          color: 0x00ffff,
          fields: [
            {
              "name": `:thermometer: Temp:`,
              "value": ` > **${weather.data.current.temp_f}% Fahrenheit**\n> **${weather.data.current.temp_c}% Celsius**`
            },
            {
              name: `Condition:`,
              value: `> ${weather.data.current.condition.text}`,
            },
            {
              name: `💨 Wind`,
              value: `> **Speed:** ${weather.data.current.wind_mph} mph\n> **Direction:** ${weather.data.current.wind_degree}° ${weather.data.current.wind_dir} `,
            },
            {
              name: `☁️ Clouds`,
              value: `> ${weather.data.current.cloud}%`,
            },
            {
              name: `👀️ Visibility`,
              value: `> ${weather.data.current.vis_miles} mi`,
            },
          ],
          thumbnail: {
            url: ``,
            height: 0,
            width: 0,
          },
        },
      ],
      message_reference: {
        message_id: `${context.params.event.id}`,
      },
    });
  }
} catch (e) {
  console.log(e);
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: `Please provide a city or postal!\n \`Do -weather [City or Postal]\``,
    message_reference: {
      message_id: `${context.params.event.id}`,
    },
  });
}
