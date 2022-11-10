const express = require("express");
const app = express();

require("dotenv").config();

const {PORT} = process.env;

app.get("/", (req, res) => {
    res.send("Success!!!!!!");
})

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});