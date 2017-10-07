let express = require('express');
let router = express.Router();
const WebSocket = require('ws');
let Index = require('../controllers/index');

router.get('/', Index.index_get);
router.post('/done', Index.index_post);

module.exports = router;