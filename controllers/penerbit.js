const Penerbit = require('../models/penerbit');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

module.exports.getAllPenerbit = (req, res) => {
    Penerbit.findAll()
        .then((penerbit) => {
            res.status(200).json(penerbit);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getDetailPenerbit = (req, res) => {
    Penerbit.findOne({
            where: {
                id: req.params.penerbit_id
            }
        })
        .then((penerbit) => {
            res.status(200).json(penerbit);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.storePenerbit = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { //isAdmin
                Penerbit.create({
                        nama: req.body.nama,
                        email: req.body.email,
                        alamat: req.body.alamat
                    })
                    .then((penerbit) => {
                        res.status(200).json({
                            msg: 'Penerbit Created',
                            penerbit: penerbit
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Forbiden, You Are Not an Admin!'
                });
            }
        }
    })
}

module.exports.updatePenerbit = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { //isAdmin
                Penerbit.findOne({
                        where: {
                            id: req.params.penerbit_id
                        }
                    })
                    .then((penerbit) => {
                        if (!penerbit) {
                            return res.status(404).json({
                                msg: 'Penerbit Not Found'
                            });
                        }
                        penerbit.nama = req.body.nama;
                        penerbit.email = req.body.email;
                        penerbit.alamat = req.body.alamat;
                        penerbit.save();

                        return res.status(200).json({
                            msg: 'Penerbit Updated',
                            penerbit: penerbit
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Forbiden, You Are Not an Admin!'
                });
            }
        }
    })
}


module.exports.destroyPenerbit = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { //isAdmin
                Penerbit.destroy({
                        where: {
                            id: req.params.penerbit_id
                        }
                    })
                    .then((penerbit) => {
                        res.status(200).json({
                            msg: 'Penerbit Deleted'
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Forbiden, You Are Not an Admin!'
                });
            }
        }
    })
}

module.exports.searchPenerbit = (req, res) => {
    Penerbit.findAll({
            limit: 10,
            where: {
                title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + req.params.title + '%')
            }
        })
        .then((penerbit) => {
            res.status(200).json({
                msg: 'search results',
                result: penerbit
            });
        })
        .catch((error) => {
            console.log(error)
        });
}