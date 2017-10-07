let express = require('express');
let router = express.Router();

let Index = require('../controllers/index');


router.get('/', Index.index_get);

module.exports = router;