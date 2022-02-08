module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction', {
    value: { type: DataTypes.DECIMAL(6, 2), allowNull: false },
    transaction_type_id: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
  },
    {
      timestamps: false,
    });

  Transaction.associate = (models) => {
    models.bank_account.belongsToMany(models.bank_account, {
      as: 'BankAccounts',
      through: Transaction,
      foreignKey: 'issuing_account_id',
      otherKey: 'receiving_account_id',
    });

    models.bank_account.belongsToMany(models.bank_account, {
      as: 'bank_account',
      through: Transaction,
      foreignKey: 'receiving_account_id',
      otherKey: 'issuing_account_id',
    },

      { timestamps: false });

    Transaction.associate = (models) => {
      Transaction.belongsTo(models.TransactionType, { foreignKey: 'id', as: 'TransactionType' });
    };

  };
  return Transaction;
};
