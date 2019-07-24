const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Penerbit extends Sequelize.Model {}

Penerbit.init({
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    alamat: Sequelize.STRING,
}, {
    sequelize,
    modelName: 'penerbit'
});

module.exports = Penerbit;