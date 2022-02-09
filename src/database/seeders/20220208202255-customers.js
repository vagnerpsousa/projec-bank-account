module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'customers',
      [{
        id: 1,
        full_name: 'José Antônio',
        cpf: '12345678911',
        email: 'antonio_jose@email.com',
        password: '123456',
      },
      {
        id: 2,
        full_name: 'Maria Jose',
        email: 'jose_maria@email.com',
        cpf: '12345678922',
        password: '123456',
      },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('customers', null, {});
  },
};
