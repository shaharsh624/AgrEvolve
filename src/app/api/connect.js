const mongoose = require("mongoose");
require("dotenv").config();

// Atlas Data
const connectToMongoDBData = mongoose.createConnection(
    String(process.env.MONGODB_URL_DATA)
);

// Atlas CommodityData
const connectToMongoDBCommodity = mongoose.createConnection(
    String(process.env.MONGODB_URL_COMMODITY)
);

// Atlas Users
const connectToMongoDBUsers = mongoose.createConnection(
    String(process.env.MONGDB_URL_USER)
);

// Local MongoDB Data
const connectToMongoDBLocal = mongoose.createConnection(
    String(process.env.MONGO_URL_LOCAL_DATA)
);

// Local MongoDB CommodityData
const connectToMongoDBLocalCommodity = mongoose.createConnection(
    String(process.env.MONGO_URL_LOCAL_COMMODITY)
);

// Verifying Connections
if (connectToMongoDBData.readyState === 2)
    console.log("Database Connected: Data");

if (connectToMongoDBCommodity.readyState === 2)
    console.log("Database Connected: CommodityData");

if (connectToMongoDBUsers.readyState === 2)
    console.log("Database Connected: Users");

if (connectToMongoDBLocal.readyState === 2)
    console.log("Database Connected: Local Data");

if (connectToMongoDBLocalCommodity.readyState === 2)
    console.log("Database Connected: Local CommodityData");

module.exports = {
    connectToMongoDBData,
    connectToMongoDBCommodity,
    connectToMongoDBLocal,
    connectToMongoDBLocalCommodity,
    connectToMongoDBUsers,
};
