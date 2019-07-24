const Sequelize = require('sequelize');

const sequelize = require('../configs/sequelize');

class Buku extends Sequelize.Model {}

Buku.init({
    judul: Sequelize.STRING,
    jumlah_halaman: Sequelize.INTEGER,
    harga: Sequelize.INTEGER,
    penerbitId: Sequelize.INTEGER,
}, {
    sequelize,
    modelName: 'book'
});

module.exports = Buku;