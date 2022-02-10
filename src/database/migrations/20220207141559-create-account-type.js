module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('account_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      accountType: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        field: 'account_type',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('account_types');
  },
};
