const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const {
    connectToMongoDBMarket,
    connectToMongoDBCommodity,
    connectToMongoDBLocalCommodity,
} = require("../connect");
const { Decimal128 } = require("mongodb");

// ----------------------------------- Markets -----------------------------------
const marketSchema = new mongoose.Schema({
    state_id: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    districts: [
        {
            district_id: {
                type: String,
                required: true,
            },
            district: {
                type: String,
                required: true,
            },
            markets: [
                {
                    market_id: {
                        type: String,
                        required: true,
                    },
                    market: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },
    ],
});

const Markets = connectToMongoDBMarket.model("market", marketSchema);

// Get States
async function handleGetStates(req, res) {
    const result = await Markets.find({});
    return res.json(result.map((states) => states["state"]));
}

// Get Districts
async function handleGetDistricts(req, res) {
    const stateName = req.params.state;
    const state = await Markets.findOne({ state: stateName });
    const districts = state["districts"];
    return res.json(districts.map((district) => district["district"]));
}

// Get Markets
async function handleGetMarkets(req, res) {
    const stateName = req.params.state;
    const districtName = req.params.district;

    const state = await Markets.findOne({ state: stateName });
    const districts = state["districts"];

    const markets = districts.find(
        (district) => district["district"] === districtName
    )["markets"];

    return res.json(markets.map((market) => market["market"]));
}

// ----------------------------------- Commodities -----------------------------------

const commoditySchema = new mongoose.Schema(
    {
        "Reported Date": {
            type: Date,
            required: true,
        },
        Arrivals: {
            type: Decimal128,
            required: true,
        },
        Group: {
            type: String,
        },
        Variety: {
            type: String,
        },
        "Market Name": {
            type: String,
            required: true,
        },
        "Modal Price": {
            type: Decimal128,
            required: false,
        },
        "Min Price": {
            type: Decimal128,
            required: false,
        },
        "Max Price": {
            type: Decimal128,
            required: false,
        },
        "State Name": {
            type: String,
            required: true,
        },
        "District Name": {
            type: String,
            required: true,
        },
    },
    {
        timeseries: {
            timeField: "Reported Date",
            granularity: "days",
        },
        autoCreate: false,
    }
);

mongoose.pluralize(null);

// Get Request for each Commodity
async function handleGetCommodity(req, res) {
    const commodity = req.params.commodity;
    const Commodity = connectToMongoDBLocalCommodity.model(
        commodity,
        commoditySchema
    );
    const result = await Commodity.find({});
    return res.json(result);
}

// Create Request for each commodity to add it's data from folders
async function handleCreateCommodity(req, res) {
    const commodity = req.params.commodity;
    const currentDir = __dirname;
    const parentDir = path.join(currentDir, "..", "..", "..");
    const data = require(`${parentDir}\\data\\` + commodity + ".json");
    const Commodity = connectToMongoDBLocalCommodity.model(
        commodity,
        commoditySchema
    );
    await Commodity.insertMany(data);
    return res.status(200).json({
        message: `Successfully uploaded commodity: ${commodity}`,
    });
}

module.exports = {
    handleGetStates,
    handleGetDistricts,
    handleGetMarkets,

    handleGetCommodity,
    handleCreateCommodity,
};

async function run() {
    mongoose
        .connect("mongodb://localhost:27017/CommodityData")
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.error("Error connecting to MongoDB:", err));

    const commodityFile = "commodity.csv";
    const collectionNames = [];

    fs.createReadStream(commodityFile)
        .pipe(csv({ headers: false }))
        .on("data", (row) => {
            collectionNames.push(row[1]);
        })
        .on("end", () => {
            const newArray = collectionNames
                .slice(1)
                .map((name) => name.toLowerCase()); // Convert to lowercase
            createCollections(newArray); // Call createCollections with newArray
        });

    // Function to create collections
    async function createCollections(collectionNames) {
        for (const collectionName of collectionNames) {
            try {
                await mongoose.connection.createCollection(collectionName);
            } catch (error) {
                console.error(
                    `Error creating collection ${collectionName}:`,
                    error
                );
            }
        }
        mongoose.disconnect();
    }
}
