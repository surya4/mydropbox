let express = require('express');
let router = express.Router();
const WebSocket = require('ws');
let Index = require('../controllers/index');

router.get('/', Index.index_get);

module.exports = router;