const { customer, account_type, bank_account, transaction, transaction_type } = require('../../database/models');
const { Op } = require("sequelize");

const create = async (issuing_account_id, receiving_account_id, value, type_name) => {
  const transactionTypeData = await transaction_type.findOne({ where: { type_name } });

  const transaction_type_id = transactionTypeData.dataValues.id;

  await bank_account.increment( { balance: value }, { where: { customer_id: receiving_account_id } });

  if (type_name === 'transferência') {
    await bank_account.decrement( { balance: value }, { where: { customer_id: issuing_account_id } });
  }

  const newTransaction = await transaction.create({ value, transaction_type_id, issuing_account_id, receiving_account_id });

  return newTransaction;
};

// const getByCpfOrEmail = async (cpfOrEmail) => {
//   let customerData = await customer.findOne({ where: { [Op.or]: [{ cpf: cpfOrEmail }, { email: cpfOrEmail }] } });

//   return customerData;
// };

// const updateById = async (id, body) => {
//   const {
//     fullName: full_name,
//     cpf,
//     email,
//     accountType
//   } = body;
//   const accountTypeData = await account_type.findOne({ where: { account_type: accountType } });
//   const account_type_id = accountTypeData.dataValues.id;
//   const updatedCustomer = await customer.update({ full_name, cpf, email }, { where: { id } });
//   await bank_account.update({ account_type_id }, { where: { customer_id: id } });

//   return updatedCustomer;

// }

const deleteById = async (id, transactionData) => {
  const { transaction_type_id, issuing_account_id, receiving_account_id, value} = transactionData;

  await bank_account.decrement( { balance: value }, { where: { customer_id: receiving_account_id } });

  if (transaction_type_id === 2) {
    await bank_account.increment( { balance: value }, { where: { customer_id: issuing_account_id } });
  }

  await transaction.destroy({ where: { id } });
}

const getAll = async () => {
  const transactions = await transaction.findAll({
  });

  if (transactions.length === 0) return null;

  return transactions;
};

const getById = async (id) => {
  const transactionData = await transaction.findOne({ where: { id } });

  return transactionData;
};


module.exports = {
  create,
  //   getByCpfOrEmail,
  getAll,
  getById,
  deleteById,
};