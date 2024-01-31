const Merchant = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'merchant',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      server: {
        type: DataTypes.STRING(191),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: '',
      },
      npcName: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: '',
      },
      informant: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: '',
      },
      itemList: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: '',
      },
      reportTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      tableName: 'merchant',
      freezeTableName: true,
      timestamps: false
    }
  );
};

module.exports = Merchant;
