const express = require("express");
const app = express();

require("dotenv").config();
const jwt = require("jsonwebtoken");

const {PORT, ACCESS_TOKEN_SECRET} = process.env;

// This is for the Databases
const {User} = require("./db/User");
const {sequelize} = require("./db/db");

// Requiring BCrypt and Creating Salt Object for Hashing Passwords. 
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(4);

//Include the Middleware
// This is important for when we include information in the body of the request or the "req.body". 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

let setUser = async (req, res, next) => {
    try{
        //The first thing we will do is we will get the "auth"
        const auth = req.header("Authorization");
        if(!auth){
            console.log("I'm in the if");
            next();
        }else{
            console.log("I'm in the else");
            const [, token] = auth.split(" ");
            console.log("Token: ", token)
            const user = jwt.verify(token, ACCESS_TOKEN_SECRET);
            req.user = user;
            next();
        }
    }catch(err){
        console.error(err)
        next(err);
    }
}

app.get("/", (req, res) => {
    res.send("Success!!!!!!");
})

app.get("/users", async (req, res) => {
    let users = await User.findAll();
    res.send(users);
})

app.post("/users/register", async (req, res) => {
    // The user should be authenticated

    // First thing we want to do is get the data passed into the body
    const {username, password} = req.body;

    console.log("The username is: ", username);
    console.log("The password is: ", password);

    // What we want to do now is, we want to create a user based on the data passed in, except, we want to hash the password as it goes into the database!
    // We can accomplish that using Bcrypt: 
    hashedPW = bcrypt.hashSync(password, salt);

    // Now we can create the user with these references: 
    let createdUser = await User.create({username, password: hashedPW});

    console.log("hashedPW: ", hashedPW);


    const token = jwt.sign({id: createdUser.id, username: createdUser.username}, ACCESS_TOKEN_SECRET);



    res.send({message: "User Successfully Registed", token})
    

})

app.post("/users/login", setUser, async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({where: {username}});
    const isMatch = bcrypt.compareSync(password, user.password);
    if(isMatch){
        // Successful Login
        // Deconstructing the User Object by its properties/fields.
        const {id, username} = user

        const token = jwt.sign({
            id, 
            username
        }, ACCESS_TOKEN_SECRET);

        res.send({message: "Successful Login", token});
    }else{
        // Not successful Login
        res.send("User Not Found");
    }
})

app.listen(PORT, async () => {

    
    await sequelize.sync({force:true});
  

    console.log(`App listening on http://localhost:${PORT}`);
});