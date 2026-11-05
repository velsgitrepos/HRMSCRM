const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysql');

const Team = sequelize.define('Team', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  designation: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  experience: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  linkedinUrl: {
    type: DataTypes.STRING(500),
    defaultValue: '',
    field: 'linkedin_url',
  },
  whatsappNumber: {
    type: DataTypes.STRING(50),
    defaultValue: '',
    field: 'whatsapp_number',
  },
  imageUrl: {
    type: DataTypes.STRING(500),
    defaultValue: '',
    field: 'image_url',
  },
  _id: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.id;
    },
  },
}, {
  tableName: 'teams',
});

Team.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  values._id = values.id;
  return values;
};

module.exports = Team;
