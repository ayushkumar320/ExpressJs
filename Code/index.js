// Using express to make the server
const express = require("express");
const url = require("url")
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    return res.send(`This is index page ${req.url}`);
});
app.get('/about', (req, res) => {
    return res.send(`This is about page ${req.url}`);
});

app.listen(port, () => {
    console.log("Server is running");
});