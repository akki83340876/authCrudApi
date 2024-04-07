
module.exports = (sequelize, DataTypes) => {
const category = sequelize.define('category', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false 

      },
      name: {
        type: DataTypes.STRING,
      },
      
      delete_At : {
        type : DataTypes.DATE,
        allowNull : true,
        defaultValue : null
      }
     
    }, {
        paranoid : true,
        timestamps : true,
        deletedAt : 'delete_At'
   
    });
    
    return category
  }