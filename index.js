const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Defina seu token de verificação (o mesmo que você colocou no Meta)
const VERIFY_TOKEN = "danilo1973";

// Middleware para interpretar JSON
app.use(bodyParser.json());

// ✅ Endpoint para verificação do webhook (validação do Meta)
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('✅ WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

// ✅ Endpoint para receber mensagens
app.post('/webhook', (req, res) => {
    const body = req.body;

    console.log('📩 Recebido webhook:', JSON.stringify(body, null, 2));

    if (body.object) {
        body.entry.forEach(entry => {
            const changes = entry.changes;

            changes.forEach(change => {
                if (change.value && change.value.messages) {
                    const message = change.value.messages[0];
                    const contact = change.value.contacts[0];

                    const msgBody = message.text ? message.text.body : '';
                    const from = message.from;
                    const name = contact.profile.name;

                    console.log(`➡️ Mensagem recebida de ${name} (${from}): ${msgBody}`);
                }
            });
        });

        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`🚀 Webhook server is listening on port ${port}`);
});
