{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require('express');\
const app = express();\
const port = process.env.PORT || 3000;\
\
const VERIFY_TOKEN = 'danilo1973';\
\
app.use(express.json());\
\
app.get('/webhook', (req, res) => \{\
  const mode = req.query['hub.mode'];\
  const token = req.query['hub.verify_token'];\
  const challenge = req.query['hub.challenge'];\
\
  if (mode === 'subscribe' && token === VERIFY_TOKEN) \{\
    console.log('WEBHOOK_VERIFIED');\
    res.status(200).send(challenge);\
  \} else \{\
    res.sendStatus(403);\
  \}\
\});\
\
app.post('/webhook', (req, res) => \{\
  console.log('Incoming webhook:', JSON.stringify(req.body, null, 2));\
  res.sendStatus(200);\
\});\
\
app.listen(port, () => \{\
  console.log(`Webhook server is listening on port $\{port\}`);\
\});}