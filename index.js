const http = require('http');
const bedrock = require('bedrock-protocol');
const config = require('./config.json');

// Servidor Web para mantener Render y UptimeRobot vivos
http.createServer((req, res) => {
  res.write("Bot de Bedrock activo 24/7");
  res.end();
}).listen(process.env.PORT || 3000);

function createBot() {
  console.log('Conectando bot a Bedrock...');

  const client = bedrock.createClient({
    host: config.ip,
    port: parseInt(config.port),
    username: config.username,
    offline: true // No requiere cuenta de Xbox/Microsoft Premium
  });

  client.on('join', () => {
    console.log('¡ÉXITO: El bot ha entrado al servidor de Bedrock!');
  });

  client.on('spawn', () => {
    console.log('El bot ha aparecido en el mundo.');
  });

  client.on('kick', (reason) => {
    console.log('El bot fue expulsado:', JSON.stringify(reason));
  });

  client.on('close', () => {
    console.log('Conexión cerrada. Reintentando en 15 segundos...');
    setTimeout(createBot, 15000);
  });

  client.on('error', (err) => {
    console.log('Error en Bedrock:', err.message || err);
  });
}

createBot();
