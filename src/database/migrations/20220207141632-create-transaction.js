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
      transactionTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'transaction_type_id',
      },
      issuingAccountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'issuing_account_id',
      },
      receivingAccountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'receiving_account_id',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('transactions');
  },
};
