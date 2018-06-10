const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const factom = require('./factomRouter');

app.use(bodyParser.json());
app.use(cors());

app.use('/factom', factom);

app.listen(3001, () => console.log('Example app listening on port 3001!'))