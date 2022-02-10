module.exports = (sequelize, DataTypes) => {
  const BankAccount = sequelize.define(
    'BankAccount',
    {
      customerId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        field: 'customer_id',
      },
      accountTypeId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        field: 'account_type_id',
      },
      balance: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'bank_accounts',
    },
  );

  BankAccount.associate = (models) => {
    BankAccount.belongsTo(models.Customer, { foreignKey: 'customerId', as: 'customer' });
    BankAccount.belongsTo(models.AccountType, { foreignKey: 'accountTypeId', as: 'account_type' });
  };

  return BankAccount;
};
