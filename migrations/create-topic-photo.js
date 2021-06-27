'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TopicPhoto', {
      TopicId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Topics',
          key: 'id'
        },
        allowNull: false
      },
      PhotoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Photos',
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TopicPhoto');
  }
};
