module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaction_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      typeName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        field: 'type_name',
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('transaction_types');
  },
};
