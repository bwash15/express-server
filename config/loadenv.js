const { config } = require( "dotenv" );


// load user session info > thier IP address, any other info
// Simply design it in the object below return statement 

// load to and from session storage
// Server, Database, session, statushub

module.exports = () => {
    const env = config( { path: `./${process.env.NODE_ENV || 'development'}.env`, } );

    if ( config.error ) {
        throw env.error;
    }

    return {
        server: {
            port: parseInt( env.parsed.SERVER_PORT, 10 ),
            active_sessions: "Need to set active sessions dynamically",
            server_running_time: "",
        },
        database: {
            db_name: env.parsed.DB_NAME,
            user: env.parsed.DATABASE_USER,
            db_key: env.parsed.DATABASE_PWD,
        },
        session: {
            numOfUsersConnected: 0,
            howLongHasSessionBeenActive: "",
            sessionErrors: false,
            errorsFromSessionListed: "",
        },
        _dbStatusHub: {
            _db1: {
                db_name: env.parsed.DATABASE_NAME,
                usersConnected: env.parsed.DATABASE_USER,
                db_key: env.parsed.DATABASE_PWD,
                status: "",
                _dbSessionErrors: false,
                errorsFrom_db_SessionListed: {},
                timesDbDisconnected: 0,
            }
        }
    };
};
