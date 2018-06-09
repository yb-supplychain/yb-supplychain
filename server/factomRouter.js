'use strict';
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.send('Hello Factom World'));

module.exports = router;