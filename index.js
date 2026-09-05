const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'Dragon-mc.aternos.me',
  port: 59735,
  username: 'DragonBot',
  version: false
});

bot.on('login', () => {
  console.log('🔄 Connecting to Dragon-MC...');
});

bot.on('spawn', () => {
  console.log('✅ DragonBot SERVER ME JOIN HO GAYA!');
});

bot.on('resourcePack', () => {
  console.log('📦 Resource pack received!');

  try {
    bot.acceptResourcePack();
    console.log('✅ Resource pack accepted!');
  } catch (err) {
    console.log('❌ Resource pack error:', err.message);
  }
});

bot.on('kicked', (reason) => {
  console.log('❌ BOT KICKED:', reason);
});

bot.on('error', (err) => {
  console.log('❌ BOT ERROR:', err.message);
});

bot.on('end', () => {
  console.log('🔴 Bot disconnected.');
});
