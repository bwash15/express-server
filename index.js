const express = require( 'express' );
const PORT = process.env.PORT || 3500;
const Env = require( './config/loadenv' );


// Checking if Environment loaded correctly
try {
    const _env = Env();
    console.log( _env )
} catch ( error ) {
    console.error( error );
    process.exit( 1 );
}

const app = express();


app.listen( PORT, () => { } )




