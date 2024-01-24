const CharacterInfo = (Sequelize, DataTypes) => {
  return Sequelize.define(
    'characterinfo',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(191),
        allowNull: false
      },
      battleLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      itemLevel: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.00,
      },
      server: {
        type: DataTypes.STRING(191),
        allowNull: false,
        defaultValue: '',
      },
      jobClass: {
        type: DataTypes.STRING(191),
        allowNull: false,
        defaultValue: '',
      },
      guildName: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: '',
      },
      guildMaster: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      setArmorEffect: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: '',
      },
      jobEngraving: {
        type: DataTypes.STRING(191),
        allowNull: true,
        defaultValue: '',
      },
      itemLevelUpdateDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      imgAddress: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      todayCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      totalCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: 'characterinfo',
      freezeTableName: true,
      timestamps: false
    }
  );
};

module.exports = CharacterInfo;
