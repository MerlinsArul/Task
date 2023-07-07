const Sequelize = require("sequelize");
const db = require("../config/db.js")

const Loginpage = db.define('loginpage',{
    name:{
        type:Sequelize.STRING
    },
    emailId:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    }
})

module.exports = Loginpage;