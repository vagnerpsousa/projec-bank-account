const { customer, account_type, bank_account } = require('../../database/models');
const { Op } = require("sequelize");
const  createToken  = require('../middlewares/createToken');

const create = async (body) => {
  const {
    fullName: full_name,
    cpf,
    email,
    accountType,
    password
  } = body;
  const balance = 0;
  const accountTypeData = await account_type.findOne({ where: { account_type: accountType } });
  const account_type_id = accountTypeData.dataValues.id;
  const newCustomer = await customer.create({ full_name, cpf, email, password });
  const customer_id = newCustomer.id;
  await bank_account.create({ customer_id, account_type_id, balance });
  const token = createToken(newCustomer);
  return token;
};

const login = async ({ email, password }) => {
  customerData = await customer.findOne({ where: { [Op.and]: [{ email }, { password }] } });
  let token = null;
  if (!customerData) return token;
  token = createToken(customerData);
  return token;
};

const getByCpfOrEmail = async (cpfOrEmail) => {
  let customerData = await customer.findOne({ where: { [Op.or]: [{ cpf: cpfOrEmail }, { email: cpfOrEmail }] } });

  return customerData;
};

const updateById = async (id, body) => {
  const {
    fullName: full_name,
    cpf,
    email,
    accountType
  } = body;
  const accountTypeData = await account_type.findOne({ where: { account_type: accountType } });
  const account_type_id = accountTypeData.dataValues.id;
  const updatedCustomer = await customer.update({ full_name, cpf, email }, { where: { id } });
  await bank_account.update({ account_type_id }, { where: { customer_id: id } });

  return updatedCustomer;

}

const deleteById = async (id) => {
  await bank_account.destroy({ where: { customer_id: id } });

  await customer.destroy({ where: { id } });
}

const getAll = async () => {
  const customers = await bank_account.findAll({
    include: [
      { model: customer, as: 'customers' },
      { model: account_type, as: 'account_type' }
    ],
  });

  if (customers.length === 0) return null;

  return customers;
};

const getById = async (id) => {
  const customerData = await bank_account.findByPk((id),
    {
      include: [
        { model: customer, as: 'customers' },
        { model: account_type, as: 'account_type' }
      ],
    });

  return customerData;
};

const getBankDetails = async (customer_id) => {
  const bankDetails = await bank_account.findOne({ where: { customer_id } });

  return bankDetails;
}

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