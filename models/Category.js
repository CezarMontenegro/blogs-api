const { DataTypes } = require('sequelize');

const Attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

module.exports = (sequelize) => {
  const Category = sequelize.define('Category',
    Attributes,
    {
      underscored: true,
      timestamps: false,
      tableName: 'Categories',
    });

  return Category;
};