const express = require( 'express' );
const connectDB = require( './config/db_conn' );
const mongoose = require( 'mongoose' );
const path = require( 'path' );
const cors = require( 'cors' );
const corsOptions = require( './config/corsOptions' )
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
//    CONNECT TO MONGO_DB
//     FORMAT FOR URI TO MONGODB:
// mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
connectDB();
//---------------------------------------------------------------------
// Logging Middleware
//   Parameters for logging method
//   ${req.method} - Type of request (Get, POST, PUT, Delete)
//   ${req.headers.origin} - what url did the request come from
//   ${req.url} - what url was requested on our server
//
app.use( logger );

myEmitter.on( 'ServerActivityLogs', ( msg, path, location ) => logServerEvents( msg, path, location ) );
myEmitter.on( 'serverError', ( msg, path, location ) => logServerEvents( msg, path, location ) );
myEmitter.on( 'errorLog', ( msg, path, location ) => logServerEvents( msg, path, location ) );
myEmitter.on( '404pageFoundLogs', ( msg, path, location ) => logServerEvents( msg, path, location ) );

//     BUILT-IN MIDDLEWARE
// CORS - Cross Origin Resource Sharing
// Create directory of Allowed Origins of domains that will access the application
app.use( cors( corsOptions ) );
//---------------------------------------------------------------------
// Server Middleware 
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

//---------------------------------------------------------------------
// Server Routes
app.use( '/', sessionKey );

/**************************************************/
/**
 *   SENDING A 404 PAGE NOT FOUND
 * 
 * > Express sends a 404 by default
 * > by sending a custom page it will not send a 404 bc it will accually 
 * > send the status 404 * 
 */

app.all( '*', ( req, res ) => {
    res.status( 404 );
    if ( req.accepts( 'html' ) ) {
        myEmitter.emit( `404pageFoundLogs`, `404 html Page NOT Found`, 'serverActivityLogs', 'index.js' );
        res.sendFile( path.join( __dirname, 'views', '404.html' ) );
    } else if ( req.accepts( 'json' ) ) {
        myEmitter.emit( `404pageFoundLogs`, `404 json Page NOT Found`, 'serverActivityLogs', 'index.js' );
        res.json( { error: '404 Not Found' } );
    } else {
        res.type( 'txt' ).send( '404 txt Page NOT found' );
    }
} )

app.use( errorHandler );
//****************************************************** */
// DB connection > Server Listening Socket
mongoose.connection.once( 'open', () => {
    console.log( 'Connected to MongoDB' )
    app.listen( PORT, () => console.log( `Server Running on ${PORT}` ) );
    myEmitter.emit( `ServerActivityLogs`, `Server Port: ${PORT}`, 'ServerActivityLogs', 'index.js' );
} )




