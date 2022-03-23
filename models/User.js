const { DataTypes } = require('sequelize');

const Attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  displayName: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

module.exports = (sequelize) => {
  const User = sequelize.define('User',
    Attributes,
    {
      timestamps: false,
      tableName: 'Users',
    });

  User.associate = (models) => {
     User.hasMany(models.BlogPost, { foreingKey: 'userId', as: 'BlogPosts' });
  }; 

  return User;
};