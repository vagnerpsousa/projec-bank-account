module.exports = (sequelize, DataTypes) => {
  const BankAccount = sequelize.define(
    'BankAccount',
    {
      customer_id: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
      account_type_id: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
      balance: { type: DataTypes.DECIMAL(4, 2), allowNull: false },
    },
    {
      timestamps: false,
      tableName: 'bank_accounts',
    },
  );

  BankAccount.associate = (models) => {
    BankAccount.belongsTo(models.Customer, { foreignKey: 'id', as: 'customers' });
    BankAccount.belongsTo(models.AccountType, { foreignKey: 'id', as: 'account_type' });
  };

  return BankAccount;
};
