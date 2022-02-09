module.exports = (sequelize, DataTypes) => {
  const AccountType = sequelize.define(
    'AccountType',
    {
      account_type: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      timestamps: false,
      tableName: 'account_types',
    },
  );

  AccountType.associate = (models) => {
    AccountType.hasMany(models.BankAccount, { foreignKey: 'account_type_id', as: 'account_types' });
  };

  return AccountType;
};
