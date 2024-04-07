require('dotenv').config()
const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false,
    
})

try {
    sequelize.authenticate()
    console.log("Connection has been establised successfully with DataBase...!")
} catch (error) {
    console.error("Unable to connect to the database", error)
}

const db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync({alter:true});

// Creating Table
db.admin = require('../src/models/user_model/userRegistration.model')(sequelize, DataTypes);
db.service = require("../src/models/service_model/service.model")(sequelize, DataTypes);
db.category = require("../src/models/category_model/category.model")(sequelize, DataTypes);
db.service_price_option = require("../src/models/service_model/ServicePriceOption")(sequelize,DataTypes)
//------Associations of tables--------//

 // category and service have One to Many relationship

 db.category.hasMany(db.service,{
    forienKey : "categoryId",
    as : "service" 
})
db.service.belongsTo(db.category,{
    forienKey : "categoryId",
    as : "category" 
})


db.service.hasMany(db.service_price_option, {
    forienKey: "serviceId",
    as: "service_price_option",
  });
  
  db.service_price_option.belongsTo(db.service, {
    forienKey: "serviceId",
    as: "service",
  });



  
module.exports = db;
