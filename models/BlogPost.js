const { DataTypes } = require('sequelize');

const Attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  content: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },  
  published: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updated: {
    allowNull: false,
    type: DataTypes.DATE,
  },
};

module.exports = (sequelize) => {
  const BlogPost = sequelize.define('BlogPost',
    Attributes,
    {
      timestamps: false,
      tableName: 'BlogPosts',
    });

    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, { foreingKey: 'userId', as: 'user' });
   }; 

  return BlogPost;
};