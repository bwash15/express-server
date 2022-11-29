const { config } = require( "dotenv" );

module.exports = () => {
    const env = config( { path: `./${process.env.NODE_ENV || 'development'}.env`, } );

    if ( config.error ) {
        throw env.error;
    }

    return {
        server: {
            port: parseInt( env.parsed.SERVER_PORT, 10 ),
        },
        database: {
            db_name: env.parsed.DATABASE_NAME,
            user: env.parsed.DATABASE_USER,
            db_key: env.parsed.DATABASE_PWD,
        }
    };
};