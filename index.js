const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

const VERIFY_TOKEN = 'danilo1973';

app.use(express.json());

// Verificação do webhook (GET)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    // Se acessar no navegador sem parâmetros, responde isso:
    res.status(200).send('Webhook endpoint is live ✅');
  }
});

// Recebimento de mensagens (POST)
app.post('/webhook', (req, res) => {
  console.log('Incoming webhook: ', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Webhook server is listening on port ${port}`);
});
