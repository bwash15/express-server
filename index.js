const express = require( 'express' );
const PORT = process.env.PORT || 3500;
const loadedEnv = require( './config/loadenv' );
const { logServerEvents, logger } = require( './middleware/logServerEvents' );
const errorHandler = require( './middleware/errorHandler' );
const sessionKey = require( './routes/session_key' )
const EventEmitter = require( 'events' );
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();

// Checking if Environment loaded correctly
try {
    const _env = loadedEnv();
    console.log( _env )
} catch ( error ) {
    console.error( error );
    process.exit( 1 );
}

const app = express();
//---------------------------------------------------------------------
// Logging Middleware
//   Parameters for logging method
//   ${req.method} - Type of request (Get, POST, PUT, Delete)
//   ${req.headers.origin} - what url did the request come from
//   ${req.url} - what url was requested on our server
//
app.use( logger );

myEmitter.on( 'ServerActivityLogs', ( msg, path, filename ) => logServerEvents( msg, path, filename ) );
myEmitter.on( 'serverError', ( msg, path, filename ) => logServerEvents( msg, path, filename ) );
myEmitter.on( 'errorLog', ( msg, path, filename ) => logServerEvents( msg, path, filename ) );
myEmitter.on( '404pageFoundLogs', ( msg, path, filename ) => logServerEvents( msg, path, filename ) );


//---------------------------------------------------------------------
// Server Middleware 
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

//---------------------------------------------------------------------
// Server Routes
app.use( '/', sessionKey );

/**************************************************/
/**
 *    SENDING A 404 PAGE NOT FOUND
 * 
 * > Express sends a 404 by default
 * > by sending a custom page it will not send a 404 bc it will accually 
 * > send the status 404 * 
 */

app.all( '*', ( req, res ) => {
    res.status( 404 );
    if ( req.accepts( 'html' ) ) {
        myEmitter.emit( `404pageFoundLogs`, `404 html Page NOT Found`, 'serverActivityLogs', 'html404PageFoundLog.txt' );
        res.sendFile( path.join( __dirname, 'views', '404.html' ) );
    } else if ( req.accepts( 'json' ) ) {
        myEmitter.emit( `404pageFoundLogs`, `404 json Page NOT Found`, 'serverActivityLogs', 'json404PageFoundLog.txt' );
        res.json( { error: '404 Not Found' } );
    } else {
        res.type( 'txt' ).send( '404 txt Page NOT found' );
    }
} )

app.use( errorHandler );
app.listen( PORT, () => { } )




