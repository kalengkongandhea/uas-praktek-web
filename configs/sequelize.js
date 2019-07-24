const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:s3cret@localhost:3306/uas_ekklesia_silvia');

module.exports = sequelize;