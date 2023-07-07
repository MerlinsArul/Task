const Sequelize = require('sequelize');
module.exports = new Sequelize('aspire','postgres','Merlins@01',{
    host:'localhost',
    dialect:'postgres',
    operatorsAliases:false
})


