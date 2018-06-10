'use strict';
const express = require('express');
const request = require('request-promise-native');
var PromiseA = require('bluebird').Promise;
const fs = PromiseA.promisifyAll(require('fs'));
const crypto = require('crypto');
const path = require('path');
const ursa = require('ursa');

const userChain = require('../user_chain.json');
const { encrypt, decrypt, keypair, encode } = require('./helpers');

const apiKey = fs.readFileSync(path.resolve(__dirname, '../secrets.env'));
const key = fs.readFileSync(path.resolve(__dirname, '../pw.env'));
const router = express.Router();

// Unique Chain Identifiers
const orderTag = 'ybsc_orders';

const factomOptions = {
    url: 'https://apiplus-api-sandbox-testnet.factom.com/v1/',
    headers: {
      "Content-Type": "application/json",
      "factom-provider-token": apiKey.toString()
    }
  };

router.get('/', async (req, res) => {
  const factom = await request(factomOptions);
  res.json(JSON.parse(factom));
});

// add new user to user chain
router.post('/user', async (req, res, next) => {
  const usersFile = path.resolve(__dirname, 'users.json');

  try {
    const { id, category } = req.body;
    const users = require(usersFile);
    if (users[id])
      res.status(409).send('User already exists');

    // create the key pair for encrypting data
    const key = await keypair(id);
    const publicKey = key.toPublicPem('base64');

    // prepare data for publishing on the blockchain
    const now = Date.now().toString();
    const encryptedId = encrypt(id);

    // get the current time base64 encoded
    const encodedNow = new Buffer(now.toString()).toString('base64');

    // preapre our user data to send to factom, base64 encoded
    const userData = {
      category: encrypt(category),
      created: encrypt(now),
      publicKey
    };

    const encodedData = new Buffer(JSON.stringify(userData)).toString('base64');

    const options = {
      ...factomOptions,
      url: `${factomOptions.url}chains/${userChain.chain_id}/entries`,
      json: true,
      body: {
        "external_ids": [encryptedId, encodedNow],
        "content": encodedData
      }
    }

    const userHash = await request.post(options);

    // save the user information locally as well
    users[id] = {
      encryptedId,
      ...userData,
      userHash
    };

    await fs.writeFileAsync(usersFile, JSON.stringify(users, null, 2));
    res.json(userHash);
  } catch(e) {
      return res
        .status(502)
        .send({ error: { message: e.message, code: e.code, type: e.type } });
  }
});

router.get('/users', async (req, res) => {
  factomOptions.url = `${factomOptions.url}chains/${userChain.chain_id}/entries`;
  const users = await request(factomOptions);
  res.json(JSON.parse(users));
});

// GET /user
// Retrieve a specific user from the chain
router.get('/user/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = require('./users.json');

    const { userHash: { entry_hash }} = users[id];

    const options = {
      ...factomOptions,
      url: `${factomOptions.url}chains/${userChain.chain_id}/entries/${entry_hash}`
    }
    let user = await request(options);
    user = JSON.parse(user);

    const userId = decrypt(user.external_ids[0]);
    const content = new Buffer(user.content, 'base64').toString()

    res.json(JSON.parse(content));
  } catch(e) {
    console.log('e:', e);
    res.status(e.statusCode).json(JSON.parse(e.error));
  }
});

// POST /device
// Register a new device id
router.post('/device', async (req, res) => {
  // need to have ui for order acceptance to add a device id
  res.status(200).json({ success: true });
});

// IMPORTANT
// GET /devices
// Retrieve a list of all device ids
router.get('/devices', async (req, res) => {

});

// POST /order
// Add a new order
// Body: all order related data
// Returns order ID
router.post('/order', async (req, res) => {
  const order = req.body;
  // create a unique hash from our order to use as our id
  const id = crypto.createHash('sha256').update(JSON.stringify(order)).digest('hex').slice(0,10);
  const encodedTag = encode(orderTag); // identifier to find our chains
  const encodedId = encode(id);
  const encodedNow = encode(Date.now());
  const encodedData = encode(JSON.stringify(order));
  const externalIds = [encodedId, encodedTag, encodedNow];
  if (order.deviceId)
    externalIds.push(encode(order.deviceId));

  const body = {
    "external_ids": externalIds,
    "content": encodedData
  }

  const options = {
    ...factomOptions,
    url: `${factomOptions.url}chains`,
    method: 'POST',
    json: true,
    body
  }

  const orderHash = await request(options);
  res.json(options);
});

// GET /orders
// Get list of all order ids
router.get('/orders', async (req, res) => {

});

// IMPORTAnT
// GET /order/:id
router.get('/order/:id', async (req, res) => {
  const id = req.params.id;

});

// POST /user
// Add a new user to the user chain

// GET /users
// Retrieve list of all users

// GET /user/:id
// Get information for a specific user
// Could potentially retrieve all pending orders


module.exports = router;