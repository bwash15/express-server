const { logServerEvents } = require( './logServerEvents' );

const errorHandler = ( err, req, res, next ) => {
    logServerEvents( `${err.name} : ${err.message}`, 'serverErrorLogs', 'errLog.txt' );
    console.error( `${err.stack}\t` );
    console.error( `${req.originalUrl}` );
    console.error( `${req.baseUrl}` );
    console.trace( `${req.path}` )
    res.status( 500 ).send( `${err.message}` );
}

module.exports = errorHandler;