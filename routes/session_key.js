const express = require( 'express' );
const router = express.Router();
const keyController = require( '../controllers/session-key-controller' );

router.post( '/api/request-session-key', keyController.session_key_request );

module.exports = router;