const { logServerEvents, logger } = require( '../middleware/logServerEvents' );
const EventEmitter = require( 'events' );
class Emitter extends EventEmitter { };
const myEmitter = new Emitter();
myEmitter.on( 'cors_errors', ( msg, path, filename ) => logServerEvents( msg, path, filename ) );
const allowedOrigins = require( './allowedOrigins' );

const corsOptions = {
    origin: ( origin, callback ) => {                  // remove [|| !origin] after dev
        if ( allowedOrigins.indexOf( origin ) !== -1 || !origin ) {
            callback( null, true );
        } else {
            callback( new Error( 'Not allowed by CORS' ) );
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;
