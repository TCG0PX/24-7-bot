const mineflayer = require('mineflayer');

function startBot() {
  console.log('Starting MoonLightBot...');

  const bot = mineflayer.createBot({
    host: 'Dragon-mc.aternos.me',
    port: 59735,
    username: 'MoonLightBot',
    auth: 'offline',
    version: false
  });

  bot.once('spawn', () => {
    console.log('SUCCESS: MoonLightBot joined the server!');

    setInterval(() => {
      // Pehle sab movement band
      bot.clearControlStates();

      // Random direction
      const directions = ['forward', 'back', 'left', 'right'];
      const direction =
        directions[Math.floor(Math.random() * directions.length)];

      bot.setControlState(direction, true);

      // Kabhi-kabhi jump
      if (Math.random() > 0.5) {
        bot.setControlState('jump', true);

        setTimeout(() => {
          bot.setControlState('jump', false);
        }, 500);
      }
    }, 3000);
  });

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason);
  });

  bot.on('error', (err) => {
    console.log('Error:', err.message);
  });

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 15 seconds...');
    setTimeout(startBot, 15000);
  });
}

startBot();
