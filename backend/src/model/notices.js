const notices = (Sequelize, DataTypes) => {
  return Sequelize.define(
      'notices',
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: DataTypes.STRING(191),
          allowNull: false
        },
        category: {
          type: DataTypes.STRING(191),
          allowNull: false
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        link: {
          type: DataTypes.STRING(191),
          allowNull: false
        },
      },
      {
          tableName: 'notices',
          freezeTableName: true,
          timestamps: false
      }
  )
}

module.exports = notices;
