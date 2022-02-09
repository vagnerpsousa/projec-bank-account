/* eslint-disable no-undef */
const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

describe('1 - Sua aplicação deve ter o endpoint POST `/customer`', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all');
  });

  it('Será validado que é possível cadastrar um cliente com sucesso', async () => {
    await frisby
      .post(
        `${url}/customer`,
        {
          fullName: 'Bruno Henrique',
          cpf: '12345678955',
          email: 'henrique_bruno@email.com',
          accountType: 'poupança',
          password: '123456',
        },
      )
      .expect('status', 201)
      .then((response) => {
        const { json } = response;
        expect(json.token).not.toBeNull();
      });
  });

  it('Será validado que não é possível cadastrar cliente com o campo `fullName` menor que 3 caracteres', async () => {
    await frisby
      .post(
        `${url}/customer`,
        {
          fullName: 'Jo',
          cpf: '12345678911',
          email: 'antonio_jose@email.com',
          accountType: 'poupança',
          password: '123456',
        },
      )
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"fullName" length must be at least 3 characters long');
      });
  });

  it('Será validado que não é possível cadastrar cliente com o campo `email` com formato invalido', async () => {
    await frisby
      .post(
        `${url}/customer`,
        {
          fullName: 'José Antonio',
          cpf: '12345678911',
          email: 'antonio',
          accountType: 'poupança',
          password: '123456',
        },
      )
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"email" must be a valid email');
      });
  });

  it('Será validado que o campo `email` é obrigatório', async () => {
    await frisby
      .post(
        `${url}/customer`,
        {
          fullName: 'José Antonio',
          cpf: '12345678911',
          accountType: 'poupança',
          password: '123456',
        },
      )
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"email" is required');
      });
  });

  it('Será validado que não é possível cadastrar cliente com o campo `password` menor que 6 caracteres', async () => {
    await frisby
      .post(
        `${url}/customer`,
        {
          fullName: 'José Antonio',
          cpf: '12345678911',
          email: 'antonio_jose@email.com',
          accountType: 'poupança',
          password: '12345',
        },
      )
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"password" length must be 6 characters long');
      });
  });

  it('Será validado que o campo `password` é obrigatório', async () => {
    await frisby
      .post(
        `${url}/customer`,
        {
          fullName: 'José Antonio',
          cpf: '12345678911',
          email: 'antonio_jose@email.com',
          accountType: 'poupança',
        },
      )
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"password" is required');
      });
  });

  it('Validar que não é possível cadastrar um cliente com email ou cpf já existente', async () => {
    await frisby
      .post(
        `${url}/customer`,
        {
          fullName: 'José Maria',
          cpf: '12345678955',
          email: 'maria_jose@email.com',
          accountType: 'poupança',
          password: '123456',
        },
      )
      .expect('status', 201);

    await frisby
      .post(
        `${url}/customer`,
        {
          fullName: 'José Maria',
          cpf: '12345678955',
          email: 'maria_jose@email.com',
          accountType: 'poupança',
          password: '123456',
        },
      )
      .expect('status', 404)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('cpf or email already registered');
      });
  });
});
