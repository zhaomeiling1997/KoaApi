/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('login', {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    phone: {
      type: DataTypes.CHAR(11),
      allowNull: false
    },
    password: {
      type: DataTypes.CHAR(128),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    tableName: 'login'
  });
};
