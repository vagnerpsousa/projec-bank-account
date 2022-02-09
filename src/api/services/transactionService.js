/* eslint-disable camelcase */
const { BankAccount, Transaction, TransactionType } = require('../../database/models');

const create = async (issuing_account_id, receiving_account_id, value, type_name) => {
  const transactionTypeData = await TransactionType.findOne({ where: { type_name } });

  const transaction_type_id = transactionTypeData.dataValues.id;

  await BankAccount.increment(
    { balance: value },
    { where: { customer_id: receiving_account_id } },
  );

  if (type_name === 'transferência') {
    await BankAccount.decrement(
      { balance: value },
      { where: { customer_id: issuing_account_id } },
    );
  }

  const newTransaction = await Transaction.create({
    value, transaction_type_id, issuing_account_id, receiving_account_id,
  });

  return newTransaction;
};

const deleteById = async (id, transactionData) => {
  const {
    transaction_type_id, issuing_account_id, receiving_account_id, value,
  } = transactionData;

  await BankAccount.decrement(
    { balance: value },
    { where: { customer_id: receiving_account_id } },
  );

  if (transaction_type_id === 2) {
    await BankAccount.increment(
      { balance: value },
      { where: { customer_id: issuing_account_id } },
    );
  }

  await Transaction.destroy({ where: { id } });
};

const getAll = async () => {
  const transactions = await Transaction.findAll({
  });

  if (transactions.length === 0) return null;

  return transactions;
};

const getById = async (id) => {
  const transactionData = await Transaction.findOne({ where: { id } });

  return transactionData;
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
};
