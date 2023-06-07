const express = require('express');
const fs = require('fs');
const app = express();
require('dotenv').config();
const path = require('path');

const appIdValue = process.env.applicationIdentifier;
const subscriberIdValue = process.env.subscriberId;

const { addSubscriber, novuNotifierOutstanding } = require('./notifsetup');

var cors = require('cors');

app.use(cors())

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  const envVariables = { appIdValue, subscriberIdValue };

  res.render('pages/index', { envVariables });
});

app.post('/novu/subcriber/create', async (req, res) => {
  await addSubscriber()
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.json(error)
  })
})

app.post('/novu/trigger', async (req, res) => {
  await novuNotifierOutstanding(req.body, res)
  .then(data => {
    res.status(200).json({
      message: "Success",
      data
    })
  })
  .catch(error => {
    res.status(400).json({
      message: "An error occurred.",
      error
    })
  })
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
})
