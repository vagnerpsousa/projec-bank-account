module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'transaction_types',
      [{
        id: 1,
        type_name: 'depósito',
      },
      {
        id: 2,
        type_name: 'transferência',
      },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('transaction_types', null, {});
  },
};
