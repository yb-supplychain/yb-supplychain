const express = require('express')
const app = express()

const factom = require('./factomRouter');

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/factom', factom);

app.listen(3000, () => console.log('Example app listening on port 3000!'))