// models/User.js
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  email : {
    type : DataTypes.STRING,
  },
  password : {
    type: DataTypes.STRING
  },
  refresh_token: {
    type : DataTypes.STRING
  },
  deleted_At: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
}
}, {
paranoid: true,
timestamps: true,
deletedAt: 'deleted_At'
}
);

return  User;
}