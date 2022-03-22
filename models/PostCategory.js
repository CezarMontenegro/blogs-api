module.exports = (sequelize) => {
  const PostsCategory = sequelize.define('PostsCategory', { timestamps: false,
      tableName: 'BlogPosts',
    });

  PostsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: PostsCategory,
      as: 'categories',
    });
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostsCategory,
      as: 'posts',
    });
  };

  return PostsCategory;
};