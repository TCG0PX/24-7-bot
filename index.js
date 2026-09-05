const mineflayer = require('mineflayer');

const HOST = 'Dragon-mc.aternos.me';
const PORT = 59735;
const USERNAME = 'DragonBot';

function createBot() {
  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: USERNAME,
    version: false
  });

  bot.once('spawn', () => {
    console.log('✅ DragonBot joined!');

    setInterval(() => {
      bot.setControlState('forward', true);

      setTimeout(() => {
        bot.setControlState('forward', false);
        bot.setControlState('jump', true);

        setTimeout(() => {
          bot.setControlState('jump', false);
          bot.setControlState('back', true);

          setTimeout(() => {
            bot.setControlState('back', false);
          }, 2000);

        }, 500);
      }, 3000);
    }, 7000);
  });

  bot.on('resourcePack', () => {
    console.log('📦 Texture pack received!');
    try {
      bot.acceptResourcePack();
    } catch (err) {
      console.log('Resource pack error:', err.message);
    }
  });

  bot.on('kicked', reason => {
    console.log('❌ Kicked:', reason);
  });

  bot.on('error', err => {
    console.log('❌ Error:', err.message);
  });

  bot.on('end', () => {
    console.log('🔄 Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });
}

createBot();
