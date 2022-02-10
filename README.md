### Project Bank Account

Nesse projeto, foi desenvolvido um back-end usando ORM com o pacote sequelize do npm, capaz de:

- Criar e associar tabelas usando models do sequelize
- Construir endpoints para consumir os models que criar
- Fazer um CRUD com o ORM
- Validar os dados com a ferramenta Joi
- Fazer requisições de API utilizando o Axios
- Interação com o banco de dados MySQL
- Testes de integração com Jest
- Autenticar rotas do Express, usando o token JWT;



### Rodando o projeto

```bash
git clone git@github.com:vagnerpsousa/projec-bank-account.git
```

```bash
cd project-bank-account
```

```bash
npm install
```

- Crie um arquivo .env com as seguintes variaveis de ambiente:

`USER`
`PASSWORD`
`HOSTNAME`
`DATABASE`
`JWT_SECRET`


```bash
npm start
```

### Execução de testes 

```bash
npm test
```

### endpoints:

-  POST `/customer`
- O corpo da requisição deverá ter o seguinte formato:
```json
  {
    "fullName": "Ricardo Sousa",
    "cpf": "12345678999",
    "email": "sousa_ricardo@email.com",
    "accountType": "corrente",
    "password": "123456"
}
  ```
-  POST `/login`
- O corpo da requisição deverá ter o seguinte formato:
```json
  {
    "email": "sousa_ricardo@email.com",
    "password": "123456"
}
  ```
-  GET `/customer`
-  GET `/customer/id`
-  PUT `/customer/id`
- O corpo da requisição deverá ter o seguinte formato:
```json
  {
    "fullName": "Vagner Sousa",
    "cpf": "12345678555",
    "email": "sousa__vagner@email.com",
    "accountType": "corrente",
    "password": "123456"
}
  ```
-  DELETE `/customer/id`
-  POST `/transaction`
- O corpo da requisição deverá ter o seguinte formato:
```json
  {
  "cpfOrEmailIssuer":"12345678922",
  "cpfOrEmailReceiver": "12345678922",
  "transactionType": "depósito",
  "value": 1000
}
  ```
-  GET `/transaction`
-  GET `/transaction/id`
-  DELETE `/transaction/id`
