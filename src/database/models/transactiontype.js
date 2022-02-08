module.exports = (sequelize, DataTypes) => {
  const TransactionType = sequelize.define("transaction_type", {
    type_name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
    {
      timestamps: false,
    });

  return TransactionType;
};