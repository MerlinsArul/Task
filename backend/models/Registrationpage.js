const Sequelize = require('sequelize');
const db = require('../config/db.js');

const RegistrationPage = db.define('registrationPage',{
    freezeTableName:true,
    timestamps:false,
    firstname:{
        type:Sequelize.STRING
    },
    lastname:{
        type:Sequelize.STRING
    },
    mobileno:{
        type:Sequelize.NUMBER
    },
    emailId:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    },
   
})
module.exports=RegistrationPage;