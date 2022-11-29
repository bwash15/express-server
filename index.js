const express = require( 'express' );

const PORT = process.env.PORT || 3500;
const loadedEnv = require( './config/loadenv' );


// Checking if Environment loaded correctly
try {
    const _env = loadedEnv();
    console.log( _env )
} catch ( error ) {
    console.error( error );
    process.exit( 1 );
}

//---------------------------------------------------------------------

const app = express();
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

app.listen( PORT, () => { } )




