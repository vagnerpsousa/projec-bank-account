module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('account_types',
      [{
        id: 1,
        account_type: 'poupança'
      },
      {
        id: 2,
        account_type: 'corrente'
      }
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('account_types', null, {});
  },
};
