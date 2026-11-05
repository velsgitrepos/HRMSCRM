const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysql');

const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  clientName: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: 'client_name',
  },
  company: {
    type: DataTypes.STRING(150),
    defaultValue: '',
  },
  rating: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: 5,
    validate: { min: 1, max: 5 },
  },
  review: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  clientImageUrl: {
    type: DataTypes.STRING(500),
    defaultValue: '',
    field: 'client_image_url',
  },
  type: {
    type: DataTypes.ENUM('Employer', 'Candidate'),
    allowNull: false,
    defaultValue: 'Employer',
  },
  _id: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.id;
    },
  },
}, {
  tableName: 'testimonials',
  indexes: [
    { name: 'idx_testimonials_type_created', fields: ['type', 'created_at'] },
  ],
});

Testimonial.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  values._id = values.id;
  return values;
};

module.exports = Testimonial;
