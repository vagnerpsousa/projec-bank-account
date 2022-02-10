module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'full_name',
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'customers',
    },
  );

  Customer.associate = (models) => {
    Customer.hasOne(models.BankAccount, { foreignKey: 'customerId', as: 'bankAccounts' });
  };

  return Customer;
};
