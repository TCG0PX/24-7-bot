const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'Dragon-mc.aternos.me',
  port: 59735,
  username: 'moonlight_bot',
  version: false
});

// Resource / Texture Pack
bot.on('resourcePack', () => {
  console.log('Texture pack received!');
  bot.acceptResourcePack();
});

bot.once('spawn', () => {
  console.log('✅ Bot joined the server!');
});

bot.on('kicked', (reason) => {
  console.log('❌ Bot kicked:', reason);
});

bot.on('error', (err) => {
  console.log('❌ Error:', err.message);
});

bot.on('end', () => {
  console.log('🔄 Bot disconnected.');
});
