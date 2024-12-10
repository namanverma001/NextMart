const express = require('express');
const color = require('colors');
//rest object
const app = express()
//rest api
app.get('/', (req, res) => {
    resizeTo.send('<h1>welcome to app</h1>');
});

const PORT = 8000
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`.bgCyan.white);
});