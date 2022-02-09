module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      value: { type: DataTypes.DECIMAL(6, 2), allowNull: false },
      transaction_type_id: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
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
      foreignKey: 'issuing_account_id',
      otherKey: 'receiving_account_id',
    });

    models.BankAccount.belongsToMany(
      models.BankAccount,
      {
        as: 'bank_account',
        through: Transaction,
        foreignKey: 'receiving_account_id',
        otherKey: 'issuing_account_id',
      },
      { timestamps: false },
    );

    Transaction.associate = (model) => {
      Transaction.belongsTo(model.TransactionType, { foreignKey: 'id', as: 'TransactionType' });
    };
  };
  return Transaction;
};
