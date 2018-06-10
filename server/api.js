'use strict';
const express = require('express');
const request = require('request-promise-native');
var PromiseA = require('bluebird').Promise;
const fs = PromiseA.promisifyAll(require('fs'));
const crypto = require('crypto');
const path = require('path');
const ursa = require('ursa');

const userChain = require('../user_chain.json');

const { encrypt, decrypt, keypair, encode, decode } = require('./helpers');

const apiKey = fs.readFileSync(path.resolve(__dirname, '../secrets.env'));
const key = fs.readFileSync(path.resolve(__dirname, '../pw.env'));
const keyserverToken = fs.readFileSync(path.resolve(__dirname, '../keyserver.secrets.env'));
const router = express.Router();

const ordersFile = path.resolve(__dirname, 'orders.json');
const usersFile = path.resolve(__dirname, 'users.json');
const keysPath = path.resolve(__dirname, '../keys');

// Unique Chain Identifiers
const ordersTag = 'ybsc_orders';
const devicesTag = 'ybsc_devices';

const factomOptions = {
    url: 'https://apiplus-api-sandbox-testnet.factom.com/v1/',
    headers: {
      "Content-Type": "application/json",
      "factom-provider-token": apiKey.toString()
    }
  };

function keyserverOptions(id, type, method='GET', key) {
  const options = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  options.url = `http://localhost:8080/pubkey/${type}/${id}`;
  if (method === 'GET')
    options.url = `${options.url}?token${keyserverToken}`;

  if (method === 'POST' && !key) {
    throw 'Must have key if posting to key server';
  } else if (method === 'POST') {
    options.json = true;
    options.body = { key };
  }
  return options;
}

router.get('/', async (req, res) => {
  console.log('getting factom');
  const factom = await request(factomOptions);
  res.json(JSON.parse(factom));
});

// add new user to user chain
router.post('/user', async (req, res, next) => {
  try {
    const { id, category } = req.body;
    const users = require(usersFile);
    if (users[id])
      res.status(409).send('User already exists');

    // create the key pair for encrypting data
    const key = await keypair(id);
    const publicKey = key.toPublicPem('base64');

    // add key to server - broken
    // const keyOptions = keyserverOptions(id, 'user', 'POST', publicKey);
    // const addKey = await request(keyOptions);

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

// GET /user/:id
// Retrieve a specific user from the chain
router.get('/user/:id', async (req, res) => {
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
  try {
    const encodedTag = encode(devicesTag);
    const body = {"external_ids": [encodedTag]};
    const options = {
      ...factomOptions,
      url: `${factomOptions.url}chains/search`,
      method: 'POST',
      json: true,
      body
    }
    const devices = await request(options);
    res.json(devices);
  } catch(e) {
    res.status(e.statusCode).json(JSON.parse(e.error));
  }
});

// GET /orders
// Get list of all order ids
router.get('/orders', async (req, res) => {
  try {
    const encodedTag = encode(ordersTag);
    const body = {"external_ids": [encodedTag]};
    const options = {
      ...factomOptions,
      url: `${factomOptions.url}chains/search`,
      method: 'POST',
      json: true,
      body
    }
    const orders = await request(options);
    res.json(orders);
  } catch(e) {
      return res
        .status(502)
        .send({ error: { message: e.message, code: e.code, type: e.type } });
  }
});

// POST /order
// Add a new order
// Body: all order related data
// Returns order ID
router.post('/order', async (req, res) => {
  const order = req.body;
  // create a unique hash from our order to use as our id
  const id = crypto.createHash('sha256').update(JSON.stringify(order)).digest('hex').slice(0,10);
  const encodedTag = encode(ordersTag); // identifier to find our chains
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
  const orders = require(ordersFile);

  // store the order id and corresponding hash
  const ordersJson = JSON.stringify({...orders, [id]: orderHash }, null, 2);
  await fs.writeFileAsync(ordersFile, ordersJson);
  res.json(orderHash);
});

async function getOrder(orderId) {
  try{
    const orders = require(ordersFile);
    const chainId = orders[orderId].chain_id;

    const options = {
      ...factomOptions,
      url: `${factomOptions.url}chains/${chainId}/entries/last`,
      method: 'GET'
    };
    const order = await request(options);

    return decode(JSON.parse(order).content);
  } catch(e) {
    res.status(e.statusCode).json(JSON.parse(e.error));
  }
}

// GET /order/:id
router.get('/order/:id', async (req, res) => {
  try{
    const orderId = req.params.id;
    const order = await getOrder(orderId);
    res.json(JSON.parse(order));
  } catch(e) {
    res.status(e.statusCode).json(JSON.parse(e.error));
  }
});

// PUT /order/:id
// Update state of an order
router.put('/order/:id', async (req, res) => {
  try {
    const { updaterId, updaterType, updates } = req.body;
    const orderId = req.params.id;
    const type = updaterType ? updaterType : 'user';
    const orders = require(ordersFile);
    const chainId = orders[orderId].chain_id;
    const orderJson = await getOrder(req.params.id);

    let order = JSON.parse(orderJson);
    order = {...order, ...updates};
    // TODO:
    // check if order has been updated
    // get the id and type
    // retrieve the key
    // const pubKey = await request(keyserverOptions(type, updaterId, 'GET'));
    // verify the signature
    order.updater = { id: updaterId, type };
    const msg = encode(JSON.stringify(order));

    const privKey = ursa.createPrivateKey(fs.readFileSync(path.resolve(keysPath, `${updaterId}_privkey.pem`)));
    order.signature = privKey.hashAndSign('sha256', msg, 'utf8', 'base64');
    const options = {
      ...factomOptions,
      url: `${factomOptions.url}chains/${chainId}/entries`,
      method: 'POST',
      json: true,
      body: {
        "external_ids":[encode(orderId), encode(updaterId)],
        "content": encode(JSON.stringify(order))
      }
    };

    const entry = await request(options);

    res.json(entry);
  } catch(e) {
      res
        .status(502)
        .send({ error: { message: e.message, code: e.code, type: e.type } });
  }
});

module.exports = router;