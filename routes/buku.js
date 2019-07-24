const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const bukuController = require('../controllers/buku');

const auth = require('../configs/auth');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/', bukuController.getAllBuku);
router.get('/:buku_id', bukuController.getDetailBuku);
router.post('/', urlencodedParser, auth.verifyToken, bukuController.storeBuku);
router.put('/:buku_id', urlencodedParser, auth.verifyToken, bukuController.updateBuku);
router.delete('/:buku_id/destroy', urlencodedParser, auth.verifyToken, bukuController.destroyBuku);
router.post('/search/:title', urlencodedParser, bukuController.searchBuku);

module.exports = router;