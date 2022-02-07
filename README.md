### Project Bank Account

Nesse projeto, foi desenvolvido um back-end usando ORM com o pacote sequelize do npm, capaz de:

- Criar e associar tabelas usando models do sequelize
- Construir endpoints para consumir os models que criar
- Fazer um CRUD com o ORM
- Validar os dados com a ferramenta Joi
- Fazer requisições de API utilizando o Axios
- Interação com o banco de dados MySQL
- Testes de integração com Jest
- Deploy com Heroku



### Rodando o projeto

```bash
git clone git@github.com:vagnerpsousa/project-breaking-bad.git
```

```bash
cd project-breaking-bad
```

```bash
npm install
```

- Crie um arquivo .env com as seguintes variaveis de ambiente:

`USER`
`PASSWORD`
`HOSTNAME`
`DATABASE`


```bash
npm start
```

### Execução de testes 

```bash
npm test
```

### endpoints:

-  POST `/character`
-  GET `/character`
-  GET `/character/id`
-  PUT `/character/id`
-  DELETE `/character/id`

### deploy

- Utilizei os serviços do Heroku, que é necessário criar uma conta na plataforma. Se ainda não possui uma conta, acesse o [site oficial](https://id.heroku.com/login) e se cadastre.

- Para sistemas Linux , instale o snap do Heroku CLI, executando o seguinte comando:

```bash
sudo snap install heroku --classic
```

- Para sistemas macOS , instale o Heroku CLI, executando o seguinte comando:

```bash
brew tap heroku/brew && brew install heroku
```

- Após a instalação ser concluída, você poderá acessar o Heroku por meio do seu terminal.

```bash
heroku login
```

- Para adicionar o remote do Heroku , basta usar o comando create do CLI dentro da pasta da aplicação, da seguinte maneira:

```bash
heroku create
```

- Para configurar o banco de dados MySQL para Node.js no aplicativo Heroku, o primeiro passo é instalar o complemento ClearDB em nosso aplicativo com o comando:

```bash
heroku addons:create cleardb:ignite
```

- Depois de instalar os Add-ons, podemos obter a URL do nosso banco de dados executando o comando:

```bash
heroku config | grep CLEARDB_DATABASE_URL
```

- o retorno será algo parecido com:

```bash
DATABASE_URL: 'mysql://b7e2437887xxxa:0200xxx6@us-cdbr-iron-east-02.cleardb.net/heroku_7643ec736354xxx?reconnect=true'
```

- onde:

```bash
b7e2437887xxxa // nome do usuário
```
```bash
0200xxx6 // senha
```
```bash
us-cdbr-iron-east-02.cleardb.net // hospedeiro
```
```bash
heroku_7643ec736354xxx // base de dados
```

- Sete as variaveis de ambiente com seus respectivos valores:

```bash
heroku config:set USER='b7e2437887xxxa' PASSWORD='0200xxx6' HOSTNAME='us-cdbr-iron-east-02.cleardb.net' DATABASE='heroku_7643ec736354xxx'
```

- Para fazer deploy do seu app Heroku, basta você utilizar o comando git push de seu repositório local para a branch master do remote do Heroku:

```bash
git push heroku master
```

- Execute suas migrações: 

```bash
heroku run sequelize db:migrate
```

- Pronto! Acesse a URL retornada pelo Heroku e você verá que sua aplicação está no ar!


- Deploy do projeto: https://breaking-bad-12345.herokuapp.com/character















  

  
  
  

