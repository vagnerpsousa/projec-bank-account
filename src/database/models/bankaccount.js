module.exports = (sequelize, DataTypes) => {
  const BankAccount = sequelize.define('bank_account', {
    customer_id: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
    account_type_id: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
    balance: { type: DataTypes.DECIMAL(4,2), allowNull: false },
  },
    {
      timestamps: false,
    });

    BankAccount.associate = (models) => {
      BankAccount.belongsTo(models.customer, { foreignKey: 'id', as: 'customers' });
      BankAccount.belongsTo(models.account_type, { foreignKey: 'id', as: 'account_type' });
    };

  return BankAccount;
};