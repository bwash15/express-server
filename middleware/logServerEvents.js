const { format } = require( 'date-fns' );
const { v4: uuid } = require( 'uuid' );


const fs = require( 'fs' );
const fsPromises = require( 'fs' ).promises;
const path = require( 'path' );

const logServerEvents = async ( message, logDir, logName ) => {
    const dateTime = `${format( new Date(), 'yyyyMMdd\tHH:mm:ss' )}`;

    const logPath = path.join( __dirname, '..', logDir );
    // Add username to the logItem
    const logItem = `\nDateTime:[${dateTime}]\tUUID:[${uuid()}]\n\tPATH:[${logPath}]\n\tLOC:[${logName}]\n\tMessage:[${message}]\n`;
    console.log( logItem );
    try {
        // check to see if the directory exists
        if ( !fs.existsSync( path.join( __dirname, '..', logDir ) ) ) {
            // if not will create one before trying to create the log file
            await fsPromises.mkdir( path.join( __dirname, '..', logDir ) );
        }
        await fsPromises.appendFile( path.join( logPath, logDir ), logItem );
    } catch ( err ) {
        console.log( err );
    }
}

const logger = ( req, res, next ) => {
    logServerEvents( `${req.method}\t${req.headers.origin}\t${req.originalUrl}\t{${req.baseUrl}}`, 'serverRequestLogs', `exp_serverRequestLogs` );
    console.log( `${req.method} ${req.path}` );
    next();
}


module.exports = { logger, logServerEvents };