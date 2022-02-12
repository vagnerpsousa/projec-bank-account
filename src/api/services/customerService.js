const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const config = require('../../database/config/config');

const sequelize = new Sequelize(config.development);

const {
  Customer, AccountType, BankAccount, Transaction,
} = require('../../database/models');
const createToken = require('../middlewares/createToken');

const getAccountTypeByName = async (accountType) => {
  const accountTypeData = await AccountType.findOne({ where: { accountType } });
  return accountTypeData.dataValues.id;
};

const create = async (body) => {
  const t = await sequelize.transaction();
  try {
    const {
      fullName, cpf, email, accountType, password,
    } = body;

    const accountTypeId = await getAccountTypeByName(accountType);

    const newCustomer = await Customer.create(
      {
        fullName, cpf, email, password,
      },
      { transaction: t },
    );

    const customerId = newCustomer.id;
    await BankAccount.create(
      { customerId, accountTypeId, balance: 0 },
      { transaction: t },
    );

    await t.commit();

    const token = createToken(newCustomer);

    return token;
  } catch (error) {
    await t.rollback();
    return null;
  }
};

const login = async ({ email, password }) => {
  const customerData = await Customer.findOne({ where: { [Op.and]: [{ email }, { password }] } });
  let token = null;
  if (!customerData) return token;
  token = createToken(customerData);
  return token;
};

const getByCpfOrEmail = async (cpf, email) => {
  const customerData = await Customer.findOne(
    { where: { [Op.or]: [{ cpf }, { email }] } },
  );

  return customerData;
};

const updateById = async (id, body) => {
  const t = await sequelize.transaction();
  try {
    const {
      fullName, cpf, email, accountType,
    } = body;
    const accountTypeData = await AccountType.findOne(
      { where: { account_type: accountType } },
    );
    const accountTypeId = accountTypeData.dataValues.id;
    const updatedCustomer = await Customer.update(
      { fullName, cpf, email },
      { where: { id } },
      { transaction: t },
    );
    await BankAccount.update(
      { accountTypeId },
      { where: { customer_id: id } },
      { transaction: t },
    );

    await t.commit();

    return updatedCustomer;
  } catch (error) {
    await t.rollback();
    return null;
  }
};

const deleteById = async (id) => {
  const t = await sequelize.transaction();
  try {
    await BankAccount.destroy(
      { where: { customer_id: id } },
      { transaction: t },
    );

    const deletedCustomer = await Customer.destroy(
      { where: { id } },
      { transaction: t },
    );

    await t.commit();

    return deletedCustomer;
  } catch (error) {
    await t.rollback();
    return null;
  }
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
