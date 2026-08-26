const mineflayer = require('mineflayer');

function startBot() {
  console.log('Starting MoonLightBot...');

  const bot = mineflayer.createBot({
    host: 'Moon-LightSMP.aternos.me',
    port: 59735,
    username: 'MoonLightBot',
    auth: 'offline',
    version: false
  });

  bot.once('spawn', () => {
    console.log('SUCCESS: MoonLightBot joined the server!');
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
