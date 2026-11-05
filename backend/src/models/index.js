const { sequelize, connectMySQL } = require('../config/mysql');
const Admin = require('./Admin');
const Career = require('./Career');
const Application = require('./Application');
const Team = require('./Team');
const Testimonial = require('./Testimonial');
const Inquiry = require('./Inquiry');

module.exports = {
  sequelize,
  connectMySQL,
  Admin,
  Career,
  Application,
  Team,
  Testimonial,
  Inquiry,
};
