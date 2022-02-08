const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

describe('6 - Sua aplicação deve ter o endpoint DELETE `transaction/:id`', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
    shell.exec('npx sequelize-cli db:seed:all');
  });

  it('Será validado que é possível deletar uma transação com sucesso', async () => {
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
      .delete(`${url}/transaction/1`)
      .expect('status', 204);
  });

  it('Será validado que não é possível deletar uma transação inexistente', async () => {
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
      .delete(`${url}/transaction/111`)
      .expect('status', 404)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Transaction does not exist');
      });
  });

  it('Será validado que não é possível deletar uma transação sem o token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .delete(`${url}/transaction/1`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Token not found');
      });
  });

});
