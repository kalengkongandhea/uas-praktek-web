const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Buku extends Sequelize.Model {}

Buku.init({
    judul: Sequelize.STRING,
    jumlah_halaman: Sequelize.INTEGER,
    harga: Sequelize.INTEGER
}, {
    sequelize,
    modelName: 'buku'
});

module.exports = Buku;