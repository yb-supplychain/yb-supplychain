'use strict';

var PromiseA = require('bluebird').Promise;
var fs = PromiseA.promisifyAll(require('fs'));
const { readFileAsync, existsSync, writeFileAsync } = fs;

const assert = require('assert');
const path = require('path');
const crypto = require('crypto');
const ursa = require('ursa');

let pw;
pw = fs.readFileSync(path.resolve(__dirname, './pw.env'));
assert(pw.length, 'Must have a key to decypher with');

function encode(input) {
  let string = input;
  if (typeof input !== 'string')
    string = input.toString();

  return new Buffer(string).toString('base64');
}

function decode(input) {
  return new Buffer(input, 'base64').toString();
}
// encrypt and decrypt functions from
// https://stackoverflow.com/questions/10548973/encrypting-and-decrypting-with-python-and-nodejs#10550004
const encrypt = function (input, password=pw) {
    let m = crypto.createHash('md5');
    m.update(password)
    const key = m.digest('hex');

    m = crypto.createHash('md5');
    m.update(password + key)
    const iv = m.digest('hex');

    const data = new Buffer(input, 'utf8').toString('binary');

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv.slice(0,16));

    const nodev = process.version.match(/^v(\d+)\.(\d+)/);
    let encrypted;

    if( nodev[1] === '0' && parseInt(nodev[2]) < 10) {
        encrypted = cipher.update(data, 'binary') + cipher.final('binary');
    } else {
        encrypted = cipher.update(data, 'utf8', 'binary') + cipher.final('binary');
    }

    return new Buffer(encrypted, 'binary').toString('base64');
};

const decrypt = function (_input, password=pw) {
    // Convert urlsafe base64 to normal base64
    const input = _input.replace(/\-/g, '+').replace(/_/g, '/');
    // Convert from base64 to binary string
    const edata = new Buffer(input, 'base64').toString('binary')

    // Create key from password
    let m = crypto.createHash('md5');
    m.update(password)
    const key = m.digest('hex');

    // Create iv from password and key
    m = crypto.createHash('md5');
    m.update(password + key)
    const iv = m.digest('hex');

    // Decipher encrypted data
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv.slice(0,16));

    // UPDATE: crypto changed in v0.10
    // https://github.com/joyent/node/wiki/Api-changes-between-v0.8-and-v0.10
    const nodev = process.version.match(/^v(\d+)\.(\d+)/);
    let decrypted, plaintext;

    if( nodev[1] === '0' && parseInt(nodev[2]) < 10) {
        decrypted = decipher.update(edata, 'binary') + decipher.final('binary');
        plaintext = new Buffer(decrypted, 'binary').toString('utf8');
    } else {
        plaintext = (decipher.update(edata, 'binary', 'utf8') + decipher.final('utf8'));
    }

    return plaintext;
};

async function keypair(id, pathname = '../keys') {
  assert(id, 'id is required for keypair');

  const key = ursa.generatePrivateKey(1024, 65537);
  const privpem = key.toPrivatePem();
  const pubpem = key.toPublicPem();
  const privkey = path.join(__dirname, pathname, `${id}_privkey.pem`);
  const pubkey = path.join(__dirname, pathname, `${id}_pubkey.pem`);

  const exists = existsSync(privkey);
  assert(!exists, 'key pair already exists');

  await writeFileAsync(privkey, privpem, 'ascii');
  await writeFileAsync(pubkey, pubpem, 'ascii');
  return key;
}

module.exports = {
  encode,
  keypair,
  encrypt,
  decrypt,
  decode
};

