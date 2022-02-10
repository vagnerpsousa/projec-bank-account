module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      issuingAccountId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        field: 'issuing_account_id',
      },
      receivingAccountId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        field: 'receiving_account_id',
      },
      value: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
      },
      transactionTypeId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        field: 'transaction_type_id',
      },
    },
    {
      timestamps: false,
      tableName: 'transactions',
    },
  );

  Transaction.associate = (models) => {
    models.BankAccount.belongsToMany(models.BankAccount, {
      as: 'BankAccounts',
      through: Transaction,
      foreignKey: 'issuingAccountId',
      otherKey: 'receivingAccountId',
    });

    models.BankAccount.belongsToMany(
      models.BankAccount,
      {
        as: 'bank_account',
        through: Transaction,
        foreignKey: 'receivingAccountId',
        otherKey: 'issuingAccountId',
      },
      { timestamps: false },
    );

    Transaction.associate = (model) => {
      Transaction.belongsTo(model.TransactionType, { foreignKey: 'id', as: 'TransactionType' });
    };
  };
  return Transaction;
};
