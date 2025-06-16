const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const VERIFY_TOKEN = 'danilo1973'; // Você pode alterar esse token

app.use(express.json());

// Rota de verificação do webhook
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
  }
});

// Rota para receber mensagens
app.post('/webhook', (req, res) => {
  console.log('Incoming webhook:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Webhook server is listening on port ${port}`);
});
