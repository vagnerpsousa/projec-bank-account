module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'transactions',
      [{
        id: 1,
        value: 1000,
        transaction_type_id: 1,
        issuing_account_id: 1,
        receiving_account_id: 1,
      },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('transactions', null, {});
  },
};
