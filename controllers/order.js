const Order = require('../models/order');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

module.exports.getAllOrder = (req, res) => {
    Order.findAll()
        .then((order) => {
            res.status(200).json(order);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getDetailOrder = (req, res) => {
    Order.findOne({
            where: {
                id: req.params.order_id
            }
        })
        .then((order) => {
            res.status(200).json(order);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.storeOrder = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { 
                Order.create({
                        jumlah: req.body.qty,
                        bukuId: req.body.bukuId
                    })
                    .then((order) => {
                        res.status(200).json({
                            msg: 'Order berhasil dibuat!',
                            order: order
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Oops, Anda bukan admin!'
                });
            }
        }
    })
}

module.exports.updateOrder = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { 
                Order.findOne({
                        where: {
                            id: req.params.order_id
                        }
                    })
                    .then((order) => {
                        if (!order) {
                            return res.status(404).json({
                                msg: 'Order tidak ditemukan'
                            });
                        }
                        order.jumlah = req.body.jumlah;
                        order.bukuId = req.body.bukuId;
                        order.save();

                        return res.status(200).json({
                            msg: 'Order berhasil diperbarui!',
                            order: order
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Oops, Anda bukan admin!'
                });
            }
        }
    })
}


module.exports.destroyOrder = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { 
                Order.destroy({
                        where: {
                            id: req.params.order_id
                        }
                    })
                    .then((order) => {
                        res.status(200).json({
                            msg: 'Order dihapus!'
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Oops, Anda bukan admin!'
                });
            }
        }
    })
}
