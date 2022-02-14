const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const {
  customerController,
  transactionController,
  loginController,
} = require('./src/api/controllers');
const { error } = require('./src/api/middlewares');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.json());

app.use('/customer', rescue(customerController));
app.use('/login', rescue(loginController));
app.use('/transaction', rescue(transactionController));
app.use(error);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

app.get('/', (request, response) => {
  response.send();
});
