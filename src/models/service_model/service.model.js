
module.exports = (sequelize, DataTypes) => {
  const service = sequelize.define('service', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull :false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('Normal', 'VIP'),
      allowNull: false,
      defaultValue : 'Normal'  

    },
    deleted_At : {
      type : DataTypes.DATE,
      allowNull : true,
      defaultValue : null
    }
}, {
    paranoid: true,
    timestamps: true,
    deletedAt: 'deleted_At'
}
);
  return  service ;
}


