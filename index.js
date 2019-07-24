const express = require('express');

const app = express();

const userRouter = require('./routes/user');
const bukuRouter = require('./routes/buku');
const kategoriRouter = require('./routes/kategori');
const penerbitRouter = require('./routes/penerbit');
const orderRouter = require('./routes/order');

const sequelize = require('./configs/sequelize');

const User = require('./models/User');
const Buku = require('./models/Buku');
const Kategori = require('./models/Kategori');
const Penerbit = require('./models/Penerbit');
const Order = require('./models/Order');

Buku.belongsTo(Kategori)
Buku.belongsTo(Penerbit)
Order.belongsTo(Buku)

app.use('/user', userRouter);
app.use('/buku', bukuRouter);
app.use('/kategori', kategoriRouter);
app.use('/penerbit', penerbitRouter);
app.use('/order', orderRouter);

app.listen(3000, () => {
    console.log('server started');
    sequelize.sync();
})