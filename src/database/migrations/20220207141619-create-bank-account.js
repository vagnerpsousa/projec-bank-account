module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bank_accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'customer_id',
        references: {
          model: 'customers',
          key: 'id',
        },
      },
      accountTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'account_type_id',
        references: {
          model: 'account_types',
          key: 'id',
        },
      },
      balance: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('bank_accounts');
  },
};
