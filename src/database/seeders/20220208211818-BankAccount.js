module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'bank_accounts',
      [{
        id: 1,
        customer_id: 1,
        account_type_id: 1,
        balance: 1000,
      },
      {
        id: 2,
        customer_id: 2,
        account_type_id: 1,
        balance: 0,
      },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('bank_accounts', null, {});
  },
};
