const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let truthPrompts = [
  'When was the last time you lied?',
  ' What was the most embarrassing thing you’ve ever done on a date?',
  'When was the last time you cried?',
  'Have you ever accidentally hit something (or someone!) with your car?',
  'What is your biggest fear?',
  'What is your biggest fantasy?',
  'Do you have any fetishes?',
  'What is something you are glad your mum does not know about you?',
  'What is the worst thing you have ever done?',
  'What is a secret you have never told anyone?',
  'Do you have a hidden talent?',
  'Who was your first celebrity crush?',
  'Have you ever cheated in an exam?',
  'Have you ever broken the law?',
  'What is the most embarrassing thing you have ever done?',
  'What is your biggest insecurity?',
  'What is the biggest mistake you have ever made?',
  'What is the most disgusting thing you have ever done?',
  'Who would you like to kiss in this room?',
  'What is the worst thing anyone has ever done to you?',
  'What is your worst habit?',
  'What is the worst thing you have ever said to anyone?',
  'Have you ever peed in the shower?',
  'What is the strangest dream you have had?',
  'What is your biggest regret?',
  'What is the biggest misconception about you?',
  'What is the most trouble you have been in?',
  'Who is your crush?',
];
  let truthChoice = Math.floor(Math.random() * truthPrompts.length);
  let truth = truthPrompts[truthChoice];
let darePrompts = [
  'Do a free-style rap for the next minute.',
  'Let another person post a status on your behalf.',
  'Hand over your phone to another player who can send a single text saying anything they want to anyone they want.',
  'Let the other players go through your phone for one minute.',
  'Talk in a British accent until your next turn.',
  'Call a friend, pretend it is their birthday, and sing them Happy Birthday to You.',
  'Name a famous person that looks like each player in the room.',
  'Do 20 squats.',
  'Prank call one of your family members.',
  'Do a plank for a full minute.',
  'Put five ice cubes in your mouth',
  'Show the last five things you searched on your phone.',
  'Find your first crush on social and DM them.',
  'Message your crush.',
  'Describe the most attractive quality of every person in the room.',
  'Show us your best dance moves.',
  'Spin around 12 times and try to walk straight.',
  'Do 5 minutes of stand-up comedy.',
  'Show the most embarrassing photo on your phone',
  'Try and make the group laugh as quickly as possible',
  'Tell everyone an embarrassing story about yourself.',
  'Try to drink a glass of water without using your hands.',
  'Post an unflattering selfie to your favorite social media account.',
  'Call a random acquaintance and tell them you want to break up.',
  'Give a one-word “roast” to each other player.',
  'Name your crush.',
];
let dareChoice = Math.floor(Math.random() * darePrompts.length);
let dare = darePrompts[dareChoice];
if (context.params.event.content.trim() === `-truth`) {
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    channel_id: `${context.params.event.channel_id}`,
      content: '',
        tts: false,
        embed: {
          type: 'rich',
          title: `Here is your truth:`,
          description: `${truth}`,
          color: 0xb67afb,
           },
      });
 }
if (context.params.event.content.trim() === `-dare`) {
  await lib.discord.channels['@0.0.6'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: '',
      tts: false,
      embed: {
        type: 'rich',
        title: `Here is your dare:`,
        description: `${dare}`,
        color: 0xb67afb,
        },
     });
  }