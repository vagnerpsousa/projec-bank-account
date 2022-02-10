module.exports = (sequelize, DataTypes) => {
  const AccountType = sequelize.define(
    'AccountType',
    {
      accountType: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'account_type',
      },
    },
    {
      timestamps: false,
      tableName: 'account_types',
    },
  );

  AccountType.associate = (models) => {
    AccountType.hasMany(models.BankAccount, { foreignKey: 'accountTypeId', as: 'bankAccounts' });
  };

  return AccountType;
};
