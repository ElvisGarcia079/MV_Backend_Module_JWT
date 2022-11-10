const {User} = require("./User")

let seed = async () => {
    let user1 = {
        username: "Laurie",
        password: "Multiverse!"
    }

    await User.create(user1);
    console.log("Database Populated");
}

seed();

module.exports = {
    seed
}