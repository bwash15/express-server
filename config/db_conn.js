const mongoose = require( 'mongoose' );

const options = {
    autoIndex: false,               // Don't build indexes
    maxPoolSize: 10,                // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000,         // Close sockets after 45 seconds of inactivity
    family: 4,                      // Use IPv4, skip trying IPv6
    useUnifiedTopology: true,
    useNewUrlParser: true
    //minHeartbeatFrequencyMS: 1500000 // waits a minimum of 15 mins > the next API PULL
};

const connectDB = async () => {
    try {
        await mongoose.connect( process.env.MONGODB_URI, options );
    } catch ( err ) {
        console.error( err );
    }
}
module.exports = connectDB