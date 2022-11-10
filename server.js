const express = require("express");
const app = express();

require("dotenv").config();
const jwt = require("jsonwebtoken");

const {PORT} = process.env;

// This is for the Databases
const {User} = require("./db/User");
const {sequelize} = require("./db/db");

//Include the Middleware
// This is important for when we include information in the body of the request or the "req.body". 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.send("Success!!!!!!");
})

app.get("/users", async (req, res) => {
    let users = await User.findAll();

    res.send(users);
})

app.post("/users/register", (req, res) => {
    // The user should be authenticated

    // First thing we want to do is get the data passed into the body
    const {username, password} = req.body;

    console.log("The username is: ", username);
    console.log("The password is: ", password);

})

app.listen(PORT, async () => {

    
    await sequelize.sync({force:true});
  

    console.log(`App listening on http://localhost:${PORT}`);
});