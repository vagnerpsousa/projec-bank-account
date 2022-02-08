const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

describe('5 - Sua aplicação deve ter o endpoint POST `/transaction`', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
    shell.exec('npx sequelize-cli db:seed:all');
  });

  it('Será validado que é possível fazer uma transação com sucesso', async () => {
    let token;
    await frisby
      .post(`${url}/login`,
        {
          email: 'antonio_jose@email.com',
          password: '123456',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/transaction`, {
        cpfOrEmailIssuer: "12345678911",
        cpfOrEmailReceiver: "12345678911",
        transactionType: "depósito",
        value: 1000
      })
      .expect('status', 201)
      .then((response) => {
        const { json } = response;
        expect(json.value).toBe(1000);
        expect(json.transaction_type_id).toBe(1);
        expect(json.receiving_account_id).toBe(1);
      });
  });

  it('Será validado que não é possível fazer uma transação sem o campo `value`', async () => {
    let token;
    await frisby
      .post(`${url}/login`,
        {
          email: 'antonio_jose@email.com',
          password: '123456',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/transaction`, {
        cpfOrEmailIssuer: "12345678911",
        cpfOrEmailReceiver: "12345678911",
        transactionType: "depósito"
      })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"value" is required');
      });
  });

  it('Será validado que não é possível cadastrar um blogpost sem o campo `transactionType`', async () => {
    let token;
    await frisby
      .post(`${url}/login`,
        {
          email: 'antonio_jose@email.com',
          password: '123456',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/transaction`, {
        cpfOrEmailIssuer: "12345678911",
        cpfOrEmailReceiver: "12345678911",
        value: 1000
      })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"transactionType" is required');
      });
  });

  it('Será validado que não é possível fazer uma transação com o token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'kwngu4425h2',
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/transaction`, {
        cpfOrEmailIssuer: "12345678911",
        cpfOrEmailReceiver: "12345678911",
        transactionType: "depósito",
        value: 1000
      })
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Expired or invalid token');
      });
  });
});
