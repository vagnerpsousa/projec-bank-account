const { Op } = require('sequelize');
const {
  Customer, AccountType, BankAccount, Transaction,
} = require('../../database/models');
const createToken = require('../middlewares/createToken');

const create = async (body) => {
  const {
    fullName,
    cpf,
    email,
    accountType,
    password,
  } = body;
  const balance = 0;
  const accountTypeData = await AccountType.findOne({ where: { accountType } });
  const accountTypeId = accountTypeData.dataValues.id;
  const newCustomer = await Customer.create({
    fullName, cpf, email, password,
  });
  const customerId = newCustomer.id;
  await BankAccount.create({ customerId, accountTypeId, balance });
  const token = createToken(newCustomer);
  return token;
};

const login = async ({ email, password }) => {
  const customerData = await Customer.findOne({ where: { [Op.and]: [{ email }, { password }] } });
  let token = null;
  if (!customerData) return token;
  token = createToken(customerData);
  return token;
};

const getByCpfOrEmail = async (cpfOrEmail) => {
  const customerData = await Customer.findOne(
    { where: { [Op.or]: [{ cpf: cpfOrEmail }, { email: cpfOrEmail }] } },
  );

  return customerData;
};

const updateById = async (id, body) => {
  const {
    fullName,
    cpf,
    email,
    accountType,
  } = body;
  const accountTypeData = await AccountType.findOne({ where: { account_type: accountType } });
  const accountTypeId = accountTypeData.dataValues.id;
  const updatedCustomer = await Customer.update({ fullName, cpf, email }, { where: { id } });
  await BankAccount.update({ accountTypeId }, { where: { customer_id: id } });

  return updatedCustomer;
};

const deleteById = async (id) => {
  await BankAccount.destroy({ where: { customer_id: id } });

  await Customer.destroy({ where: { id } });
};

const getAll = async () => {
  const customers = await BankAccount.findAll({
    include: [
      { model: Customer, as: 'customer' },
      { model: AccountType, as: 'account_type' },
    ],
  });

  if (customers.length === 0) return null;

  return customers;
};

const getById = async (id, includeTransactions) => {
  const customerData = await BankAccount.findByPk(
    (id),
    {
      include: [
        { model: Customer, as: 'customer' },
        { model: AccountType, as: 'account_type' },
      ],
    },
  );
  let transactions = null;
  if (includeTransactions === 'true') {
    transactions = await Transaction.findAll({ where: { issuingAccountId: id } });
  }
  return [customerData, transactions];
};

const getBankDetails = async (customerId) => {
  const bankDetails = await BankAccount.findOne({ where: { customerId } });

  return bankDetails;
};

module.exports = {
  create,
  login,
  getByCpfOrEmail,
  getAll,
  getById,
  getBankDetails,
  updateById,
  deleteById,
};
