'use strict';
//public async changeColumn(tableName: string, attributeName: string, dataTypeOrOptions: object, options: object): *
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('TopicPhoto', 'PhotoId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Photos',
        key: 'id'
      },
      allowNull: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('TopicPhoto', 'TopicId');
  }
};
