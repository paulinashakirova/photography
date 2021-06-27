'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Topic.belongsToMany(models.Photo, { through: 'TopicPhoto' });
    }
  }
  Topic.init(
    {
      theme: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Topic'
    }
  );
  return Topic;
};
