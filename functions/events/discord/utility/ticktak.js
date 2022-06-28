const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let emptyTile = '⬛';
let piece1 = '❌';
let piece2 = '🔵';

let checkState = (board) => {
  let hasRowMatch = board.find((row) => {
    return row[0] !== emptyTile && (row[0] === row[1] && row[1] === row[2]);
  });
  let hasColumnMatch = board[0].find((columnHeader, i) => {
    return columnHeader !== emptyTile && (columnHeader === board[1][i] && board[1][i] === board[2][i]);
  });
  let hasDiagonalMatch = (
    (board[0][0] !== emptyTile && (board[0][0] === board[1][1] && board[1][1] === board[2][2])) ||
    (board[0][2] !== emptyTile && (board[0][2] === board[1][1] && board[1][1] === board[2][0]))
  );
  let isFull = !board.find((row) => {
    return row.find((tile) => {
      return tile === emptyTile;
    });
  });
  if (hasRowMatch || hasColumnMatch || hasDiagonalMatch) {
    return 'win';
  } else if (isFull) {
    return 'draw';
  } else {
    return 'incomplete';
  }
};

let event = context.params.event;
let referencedMessage = event.referenced_message;

if (
  !referencedMessage && (
    event.content.startsWith(`-ttt`) || 
    event.content.startsWith(`-tictactoe`)
  )
) {
  if (!event.mentions.length) {
    return lib.discord.channels['@0.1.2'].messages.create({
      channel_id: `${event.channel_id}`,
      content: `You must mention someone to play against!`
    });
  }
  let starterBoard = [
    [emptyTile, emptyTile, emptyTile],
    [emptyTile, emptyTile, emptyTile],
    [emptyTile, emptyTile, emptyTile]
  ];
  await lib.discord.channels['@0.1.1'].messages.create({
    channel_id: `${event.channel_id}`,
    content: [
      `It's Tic Tac Toe! <@!${event.author.id}>, it's your turn! You are ${piece1}.`,
      ``,
      `Reply to this message with a row (a, b, or c) and a column (1, 2, or 3) matching your move. For example, a,1`,
      ``,
      `<@!${event.mentions[0].id}>, you're next.`
    ].join('\n'),
    embed: {
      type: 'rich',
      description: starterBoard.map((row) => {
        return row.join('');
      }).join('\n'),
      color: 0x00AAAA
    }
  });
} else if (
  referencedMessage &&
  referencedMessage.author.bot &&
  referencedMessage.content.startsWith(`It's Tic Tac Toe!`)
) {
  let botResponse = await lib.discord.users['@0.1.4'].me.list();
  if (referencedMessage.author.id !== botResponse.id) {
    return;
  }
  let currentUser;
  let nextUser;
  let currentPiece = referencedMessage.content.includes(piece1) ? piece1 : piece2;
  if (!referencedMessage.mentions[1]) {
    // Playing against yourself
    currentUser = referencedMessage.mentions[0].id;
    nextUser = referencedMessage.mentions[0].id;
  } else if (referencedMessage.content.indexOf(referencedMessage.mentions[0].id) < referencedMessage.content.indexOf(referencedMessage.mentions[1].id)) {
    currentUser = referencedMessage.mentions[0].id;
    nextUser = referencedMessage.mentions[1].id;
  } else {
    currentUser = referencedMessage.mentions[1].id;
    nextUser = referencedMessage.mentions[0].id;
  }
  if (event.author.id !== currentUser) {
    await lib.discord.channels['@0.1.2'].messages.destroy({
      message_id: `${context.params.event.id}`,
      channel_id: `${context.params.event.channel_id}`
    });
    return lib.discord.channels['@0.1.2'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `Sorry, it's <@!${currentUser}>'s turn to play!`
    });
  }
  let currentBoard = referencedMessage.embeds[0].description.split('\n').map((row) => {
    return [...row]; // Split on empty character does not work on emoji
  });
  let row = event.content.split(',')[0].trim().toLowerCase();
  let column = parseInt((event.content.split(',')[1] || '').trim());
  if (
    !['a', 'b', 'c'].includes(row) ||
    ![1, 2, 3].includes(column)
  ) {
    await lib.discord.channels['@0.1.2'].messages.destroy({
      message_id: `${context.params.event.id}`,
      channel_id: `${context.params.event.channel_id}`
    });
    return lib.discord.channels['@0.1.2'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `Sorry <@!${currentUser}>, ${event.content} is not a valid move! Try "a,1".`
    });
  }
  if (row === 'a') {
    row = 0;
  } else if (row === 'b') {
    row = 1;
  } else {
    row = 2;
  }
  column = column - 1;
  let currentTile = currentBoard[row][column];
  if (currentTile !== emptyTile) {
    await lib.discord.channels['@0.1.2'].messages.destroy({
      message_id: `${context.params.event.id}`,
      channel_id: `${context.params.event.channel_id}`
    });
    return lib.discord.channels['@0.1.2'].messages.create({
      channel_id: `${context.params.event.channel_id}`,
      content: `Sorry <@!${currentUser}>, ${event.content} has already been played!`
    });
  }
  currentBoard[row][column] = currentPiece;
  let replyContent;
  let gameState = checkState(currentBoard);
  if (gameState === 'win') {
    replyContent = `The game is over! <@!${currentUser}> wins!`
  } else if (gameState === 'draw') {
    replyContent = `The game is over! It's a draw!`;
  } else {
    replyContent = [
      `It's Tic Tac Toe! <@!${nextUser}>, it's your turn! You are ${currentPiece === piece1 ? piece2 : piece1}.`,
      ``,
      `Reply to this message with a row (a, b, or c) and a column (1, 2, or 3) matching your move. For example, a,1`,
      ``,
      `<@!${currentUser}>, you're next.`
    ].join('\n');
  }
  let newEmbed = referencedMessage.embeds[0];
  newEmbed.description = currentBoard.map((row) => {
    return row.join('');
  }).join('\n');
  return lib.discord.channels['@0.1.2'].messages.create({
    channel_id: `${event.channel_id}`,
    content: replyContent,
    embed: newEmbed
  });
}