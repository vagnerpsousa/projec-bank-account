/* eslint-disable camelcase */
const { Op } = require('sequelize');
const { Customer, AccountType, BankAccount } = require('../../database/models');
const createToken = require('../middlewares/createToken');

const create = async (body) => {
  const {
    // eslint-disable-next-line camelcase
    fullName: full_name,
    cpf,
    email,
    accountType,
    password,
  } = body;
  const balance = 0;
  const accountTypeData = await AccountType.findOne({ where: { account_type: accountType } });
  const account_type_id = accountTypeData.dataValues.id;
  const newCustomer = await Customer.create({
    full_name, cpf, email, password,
  });
  const customer_id = newCustomer.id;
  await BankAccount.create({ customer_id, account_type_id, balance });
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
    fullName: full_name,
    cpf,
    email,
    accountType,
  } = body;
  const accountTypeData = await AccountType.findOne({ where: { account_type: accountType } });
  const account_type_id = accountTypeData.dataValues.id;
  const updatedCustomer = await Customer.update({ full_name, cpf, email }, { where: { id } });
  await BankAccount.update({ account_type_id }, { where: { customer_id: id } });

  return updatedCustomer;
};

const deleteById = async (id) => {
  await BankAccount.destroy({ where: { customer_id: id } });

  await Customer.destroy({ where: { id } });
};

const getAll = async () => {
  const customers = await BankAccount.findAll({
    include: [
      { model: Customer, as: 'customers' },
      { model: AccountType, as: 'account_type' },
    ],
  });

  if (customers.length === 0) return null;

  return customers;
};

const getById = async (id) => {
  const customerData = await BankAccount.findByPk(
    (id),
    {
      include: [
        { model: Customer, as: 'customers' },
        { model: AccountType, as: 'account_type' },
      ],
    },
  );

  return customerData;
};

const getBankDetails = async (customer_id) => {
  const bankDetails = await BankAccount.findOne({ where: { customer_id } });

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
