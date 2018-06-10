'use strict';
const express = require('express');
const request = require('request-promise-native');
const { readFileSync } = require('fs');
const path = require('path');

const router = express.Router();

const apiKey = readFileSync(path.resolve(__dirname, '../secrets.env'));

router.get('/', async (req, res) => {
  const options = {
    url: 'https://apiplus-api-sandbox-testnet.factom.com/v1/',
    headers: {
      "Content-Type": "application/json",
      "factom-provider-token": apiKey
    }
  };
  const factom = await request(options);
  res.json(factom);
});

module.exports = router;