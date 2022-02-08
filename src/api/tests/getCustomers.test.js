const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

describe('3 - Sua aplicação deve ter o endpoint GET `/customer`', () => {
  beforeEach(() => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
    shell.exec('npx sequelize-cli db:seed:all');
  });

  it('Será validado que é possível listar todos os clientes', async () => {
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
      .get(`${url}/customer`)
      .expect('status', 200)
      .then((responseSales) => {
        const { json } = responseSales;
        const firstUser = json[0];
        const secondUser = json[1];
        expect(firstUser.customers.full_name).toBe('José Antônio');
        expect(firstUser.customers.email).toBe('antonio_jose@email.com');
        expect(firstUser.customers.cpf).toBe('12345678911');
        expect(secondUser.customers.full_name).toBe('Maria Jose');
        expect(secondUser.customers.email).toBe('jose_maria@email.com');
        expect(secondUser.customers.cpf).toBe('12345678922');
      });
  });

  it('Será validado que não é possível listar clientes sem o token na requisição', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/customer`)
      .expect('status', 401)
      .then((responseSales) => {
        const { json } = responseSales;
        expect(json.message).toBe('Token not found');
      });
  });

  it('Será validado que não é possível listar usuários com o token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'mo3183bfbahaf',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/customer`)
      .expect('status', 401)
      .then((responseSales) => {
        const { json } = responseSales;
        expect(json.message).toBe('Expired or invalid token');
      });
  });
});
