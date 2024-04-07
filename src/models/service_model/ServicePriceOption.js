    module.exports = (sequelize, DataTypes) => {
    const service_price_option = sequelize.define('service_price_option', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull :false
          },
        duration: {
            type: DataTypes.STRING,
            allowNull: false
          },
          price: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          type: {
            type: DataTypes.ENUM('Hourly', 'Weekly', 'Monthly'),
            allowNull: false
          },
        deleted_At: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        paranoid: true,
        timestamps: true,
        deletedAt: 'deleted_At'
    }
    
    );
    
    return service_price_option;
    }