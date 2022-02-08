module.exports = (sequelize, DataTypes) => {
  const AccountType = sequelize.define("account_type", {
    account_type: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
    {
      timestamps: false,
    });

    AccountType.associate = (models) => {
      AccountType.hasMany(models.bank_account, { foreignKey: 'account_type_id', as: 'account_types', });
    };

  return AccountType;
};