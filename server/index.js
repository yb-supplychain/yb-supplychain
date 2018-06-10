const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const api = require('./api');

app.use(bodyParser.json());
app.use(cors());

app.use('/api', api);

app.listen(3001, () => console.log('Example app listening on port 3001!'))