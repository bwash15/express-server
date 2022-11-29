const { generateApiKey } = require( 'generate-api-key' );

// Replace with Mongoose Model Data Object
const sessions = new Map();

//--------------------------------------------------------------------
const session_key_request = ( req, res ) => {
    const sessionId = req.body.sessionId;
    if ( !sessionId ) return res.status( 500 ).json( { error: `${sessionId} is required` } );
    if ( sessions.has( sessionId ) ) return res.status( 500 ).json( { error: `${sessionId} already exists with api-key` } );

    let api_key = generateApiKey( { method: 'uuidv4' } );
    sessions.set( sessionId, api_key );
    return res.json( {
        sessionId: sessionId,
        apikey: api_key
    } )
}

module.exports = { session_key_request };