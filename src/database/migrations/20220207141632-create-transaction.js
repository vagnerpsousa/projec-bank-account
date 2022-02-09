module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      value: {
        allowNull: false,
        type: Sequelize.DECIMAL(6, 2),
      },
      transaction_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      issuing_account_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      receiving_account_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('transactions');
  },
};
