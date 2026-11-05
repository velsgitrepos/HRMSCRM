const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysql');
const Career = require('./Career');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  jobId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'job_id',
    references: {
      model: Career,
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Applied', 'Shortlisted', 'Rejected'),
    defaultValue: 'Applied',
  },
  appliedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'applied_at',
  },
  _id: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.id;
    },
  },
}, {
  tableName: 'applications',
  timestamps: false,
  indexes: [
    { name: 'idx_applications_job_email', fields: ['job_id', 'email'] },
    { name: 'idx_applications_applied_at', fields: ['applied_at'] },
  ],
});

// Relationships
Career.hasMany(Application, { foreignKey: 'job_id', as: 'applications', onDelete: 'CASCADE' });
Application.belongsTo(Career, { foreignKey: 'job_id', as: 'job' });

Application.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  values._id = values.id;
  return values;
};

module.exports = Application;
