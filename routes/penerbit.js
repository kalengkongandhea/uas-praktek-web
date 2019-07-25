const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const penerbitController = require('../controllers/penerbit');

const auth = require('../configs/auth');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});

router.get('/', penerbitController.getAllPenerbit);
// get one penerbit
router.get('/:penerbit_id', penerbitController.getDetailPenerbit);
// post penerbit POST /api/penerbit gets JSON bodies
router.post('/', urlencodedParser, auth.verifyToken, penerbitController.storePenerbit);
// update penerbit
router.put('/:penerbit_id', urlencodedParser, auth.verifyToken, penerbitController.updatePenerbit);
// delete penerbit
router.delete('/:penerbit_id/destroy', urlencodedParser, auth.verifyToken, penerbitController.destroyPenerbit);
// search penerbit by name
router.post('/search/:nama', urlencodedParser, penerbitController.searchPenerbit);

module.exports = router;