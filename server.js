const express = require("express");
const app = express();

require("dotenv").config();
const jwt = require("jsonwebtoken");

const {PORT} = process.env;

//Include the Middleware
// This is important for when we include information in the body of the request or the "req.body". 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.send("Success!!!!!!");
})

app.post("/register", (req, res) => {
    // The user should be authenticated
})

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
});