'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bank_accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      account_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      balance: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bank_accounts');
  }
};