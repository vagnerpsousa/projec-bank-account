module.exports = (sequelize, DataTypes) => {
  const TransactionType = sequelize.define(
    'TransactionType',
    {
      type_name: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      timestamps: false,
      tableName: 'transaction_types',
    },
  );

  return TransactionType;
};
