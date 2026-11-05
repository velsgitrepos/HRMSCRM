const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysql');

const Career = sequelize.define('Career', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  jobTitle: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'job_title',
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  experience: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  employmentType: {
    type: DataTypes.ENUM('Full-time', 'Part-time', 'Contract', 'Internship'),
    allowNull: false,
    defaultValue: 'Full-time',
    field: 'employment_type',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  applyEmail: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'apply_email',
  },
  status: {
    type: DataTypes.ENUM('Open', 'Closed'),
    defaultValue: 'Open',
  },
  _id: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.id;
    },
  },
}, {
  tableName: 'careers',
  indexes: [
    { name: 'idx_careers_status_created', fields: ['status', 'created_at'] },
  ],
});

Career.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  values._id = values.id;
  return values;
};

module.exports = Career;
