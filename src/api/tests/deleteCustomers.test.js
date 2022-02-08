const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

describe('4 - Sua aplicação deve ter o endpoint DELETE `/customer/:id`', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
    shell.exec('npx sequelize-cli db:seed:all');
  });

  it('Será validado que é possível excluir meu cliente com sucesso', async () => {
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
      .delete(`${url}/customer/1`)
      .expect('status', 204);
  });

  it('Será validado que não é possivel excluir um cliente com token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'nhfur53sbyf84',
            'Content-Type': 'application/json',
          },
        },
      })
      .delete(`${url}/customer/1`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Expired or invalid token');
      });
  });

  it('Será validado que não é possivel excluir um cliente sem o token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .delete(`${url}/customer/1`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Token not found');
      });
  });
});
