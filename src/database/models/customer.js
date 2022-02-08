module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("customer", {
    full_name: { type: DataTypes.STRING, allowNull: false },
    cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
  },

    {
      timestamps: false,
    });

    Customer.associate = (models) => {
      Customer.hasOne(models.bank_account, { foreignKey: 'customer_id', as: 'customers', });
    };
  
  return Customer;
};