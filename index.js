const mineflayer = require('mineflayer');

const HOST = 'Dragon-mc.aternos.me';
const PORT = 59735;
const BOT_NAME = 'DragonBot';

function createBot() {
  console.log('🔄 Connecting to ' + HOST + ':' + PORT);

  const bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: BOT_NAME,
    auth: 'offline',
    version: '1.21.11'
  });

  // =========================
  // RESOURCE PACK FIX
  // =========================

  function acceptPack(packet) {
    try {
      const response = {
        result: 3
      };

      if (packet && packet.uuid !== undefined) {
        response.uuid = packet.uuid;
      }

      bot._client.write('resource_pack_receive', response);

      console.log('📦 Resource pack accepted');

      // Tell server pack loaded
      setTimeout(() => {
        try {
          const loaded = {
            result: 0
          };

          if (packet && packet.uuid !== undefined) {
            loaded.uuid = packet.uuid;
          }

          bot._client.write('resource_pack_receive', loaded);
          console.log('✅ Resource pack loaded');
        } catch (e) {
          console.log('Pack loaded response error:', e.message);
        }
      }, 1000);

    } catch (e) {
      console.log('❌ Resource pack error:', e.message);
    }
  }

  // 1.20.3+ / modern servers
  bot._client.on('add_resource_pack', acceptPack);

  // Older servers
  bot._client.on('resource_pack_send', acceptPack);

  // =========================
  // JOIN
  // =========================

  bot.on('login', () => {
    console.log('🔐 Login successful');
  });

  bot.once('spawn', () => {
    console.log('================================');
    console.log('✅ DRAGONBOT JOINED SERVER!');
    console.log('================================');

    startMovement(bot);
  });

  // =========================
  // MOVEMENT
  // =========================

  function startMovement(bot) {
    let direction = true;

    setInterval(() => {
      if (!bot.entity) return;

      if (direction) {
        bot.setControlState('forward', true);

        setTimeout(() => {
          bot.setControlState('forward', false);
          bot.setControlState('jump', true);

          setTimeout(() => {
            bot.setControlState('jump', false);
          }, 500);

        }, 2500);

      } else {
        bot.setControlState('back', true);

        setTimeout(() => {
          bot.setControlState('back', false);
          bot.setControlState('jump', true);

          setTimeout(() => {
            bot.setControlState('jump', false);
          }, 500);

        }, 2500);
      }

      direction = !direction;

    }, 6000);

    // Look around
    setInterval(() => {
      if (!bot.entity) return;

      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * 0.5;

      bot.look(yaw, pitch, true).catch(() => {});
    }, 5000);
  }

  // =========================
  // ERRORS
  // =========================

  bot.on('kicked', reason => {
    console.log('❌ KICKED:', reason);
  });

  bot.on('error', err => {
    console.log('❌ ERROR:', err.message);
  });

  // =========================
  // AUTO RECONNECT
  // =========================

  bot.on('end', () => {
    console.log('🔴 Bot disconnected');
    console.log('🔄 Reconnecting in 10 seconds...');

    setTimeout(() => {
      createBot();
    }, 10000);
  });
}

createBot();
