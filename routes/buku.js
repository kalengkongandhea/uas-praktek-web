const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const bukuController = require('../controllers/buku');

const auth = require('../configs/auth');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/', bukuController.getAllBook);
// get one buku
router.get('/:buku_id', bukuController.getDetailBook);
// post buku POST /api/buku gets JSON bodies
router.post('/', urlencodedParser, auth.verifyToken, bukuController.storeBook);
// update buku
router.put('/:buku_id', urlencodedParser, auth.verifyToken, bukuController.updateBook);
// delete buku
router.delete('/:buku_id/destroy', urlencodedParser, auth.verifyToken, bukuController.destroyBook);
// search buku by title
router.post('/search/:title', urlencodedParser, bukuController.searchBook);

module.exports = router;