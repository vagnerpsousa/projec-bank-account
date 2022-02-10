const { BankAccount, Transaction, TransactionType } = require('../../database/models');

const create = async (issuingAccountId, receivingAccountId, value, typeName) => {
  const transactionTypeData = await TransactionType.findOne({ where: { typeName } });

  const transactionTypeId = transactionTypeData.dataValues.id;

  await BankAccount.increment(
    { balance: value },
    { where: { customer_id: receivingAccountId } },
  );

  if (typeName === 'transferência') {
    await BankAccount.decrement(
      { balance: value },
      { where: { customer_id: issuingAccountId } },
    );
  }

  const newTransaction = await Transaction.create({
    value, transactionTypeId, issuingAccountId, receivingAccountId,
  });

  return newTransaction;
};

const deleteById = async (id, transactionData) => {
  const {
    transactionTypeId, issuingAccountId, receivingAccountId, value,
  } = transactionData;

  await BankAccount.decrement(
    { balance: value },
    { where: { customer_id: receivingAccountId } },
  );

  if (transactionTypeId === 2) {
    await BankAccount.increment(
      { balance: value },
      { where: { customer_id: issuingAccountId } },
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
