module.exports = (sequelize, DataTypes) => {
  const TransactionType = sequelize.define(
    'TransactionType',
    {
      typeName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'type_name',
      },
    },
    {
      timestamps: false,
      tableName: 'transaction_types',
    },
  );

  return TransactionType;
};
