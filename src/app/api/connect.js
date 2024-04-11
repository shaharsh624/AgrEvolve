const mongoose = require("mongoose");
require("dotenv").config();

// Atlas Data
const connectToMongoDBData = mongoose.createConnection(
    String(process.env.MONGODB_URL_DATA)
);
if (connectToMongoDBData) {
    console.log("Connected to database in MongoDB");
}

// Atlas CommodityData
const connectToMongoDBCommodity = mongoose.createConnection(
    String(process.env.MONGODB_URL_COMMODITY)
);
if (connectToMongoDBCommodity) {
    console.log("Connected to Commodity database in MongoDB");
}

// Atlas Users
const connectToMongoDBUsers = mongoose.createConnection(
    String(process.env.MONGDB_URL_USER)
);
if (connectToMongoDBUsers) {
    console.log("Connected to User database in MongoDB");
}

// Local MongoDB Data
const connectToMongoDBLocal = mongoose.createConnection(
    String(process.env.MONGO_URL_LOCAL_DATA)
);
if (connectToMongoDBLocal) {
    console.log("Connected to Local MongoDB");
}

// Local MongoDB CommodityData
const connectToMongoDBLocalCommodity = mongoose.createConnection(
    String(process.env.MONGO_URL_LOCAL_COMMODITY)
);
if (connectToMongoDBLocalCommodity) {
    console.log("Connected to Local Commodity MongoDB");
}

module.exports = {
    connectToMongoDBData,
    connectToMongoDBCommodity,
    connectToMongoDBLocal,
    connectToMongoDBLocalCommodity,
    connectToMongoDBUsers,
};
