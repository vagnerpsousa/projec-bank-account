module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      full_name: { type: DataTypes.STRING, allowNull: false },
      cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamps: false,
      tableName: 'customers',
    },
  );

  Customer.associate = (models) => {
    Customer.hasOne(models.BankAccount, { foreignKey: 'customer_id', as: 'customers' });
  };

  return Customer;
};
