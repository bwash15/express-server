const express = require( 'express' );
const PORT = process.env.PORT || 3500;
const loadedEnv = require( './config/loadenv' );
const sessionKey = require( './routes/session_key' )

// Checking if Environment loaded correctly
try {
    const _env = loadedEnv();
    console.log( _env )
} catch ( error ) {
    console.error( error );
    process.exit( 1 );
}

//---------------------------------------------------------------------
// Server Middleware 
const app = express();
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

//---------------------------------------------------------------------
// Server Routes
app.use( '/', sessionKey );

app.listen( PORT, () => { } )




