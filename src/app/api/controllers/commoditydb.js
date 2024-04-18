const mongoose = require("mongoose");
const path = require("path");
const { DateTime } = require("luxon");
const {
    connectToMongoDBCommodity,
    connectToMongoDBLocalCommodity,
} = require("../connect");
const { Decimal128 } = require("mongodb");

// Commodity Schema
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
            type: [Decimal128, null],
        },
        "Min Price": {
            type: [Decimal128, null],
        },
        "Max Price": {
            type: [Decimal128, null],
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

// ---------------------------------- API Handlers ----------------------------------

// GET Request for each Commodity
// app.get("/api/commodity/:commodity")
async function handleGetCommodity(req, res) {
    const commodity = req.params.commodity;
    const Commodity = connectToMongoDBCommodity.model(
        commodity,
        commoditySchema
    );
    const result = await Commodity.find({});
    return res.json(result);
}

// POST Request for each commodity to add it's data from folders
// app.post("/api/commodity/create/:commodity")
const handleCreateCommodity = async (req, res) => {
    const commodity = req.params.commodity;
    const currentDir = __dirname;
    const parentDir = path.join(currentDir, "..", "..", "..");
    const data = require(`${parentDir}\\data\\` + commodity + ".json");

    if (Object.keys(data).length === 0) {
        return res.status(200).json({
            message: `No data found for commodity: ${commodity}`,
        });
    }

    const Commodity = connectToMongoDBCommodity.model(
        commodity,
        commoditySchema
    );
    await Commodity.insertMany(data);
    return res.status(200).json({
        message: `Successfully uploaded commodity: ${commodity}`,
    });
};

// POST Request to filter data based on the given parameters for Commodity
// app.post("/api/commodity")
async function handleGetCommodityFilter(req, res) {
    const {
        stateName,
        districtName,
        marketName,
        commodity,
        startDate,
        endDate,
    } = req.body;

    // console.log(
    //     DateTime.fromISO(startDate).toISO(),
    //     DateTime.fromISO(endDate).toISO()
    // );
    // console.log(startDate, endDate);
    console.log(stateName, districtName, marketName, commodity);

    const query = {
        "State Name": stateName,
        "District Name": districtName,
        "Market Name": marketName,
        "Reported Date": {
            $gte: DateTime.fromISO(startDate).toISO(),
            $lte: DateTime.fromISO(endDate).toISO(),
        },
    };
    const Commodity = connectToMongoDBCommodity.model(
        commodity,
        commoditySchema
    );

    try {
        const data = await Commodity.find(query);
        return res.json(data);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    handleGetCommodity,
    handleCreateCommodity,
    handleGetCommodityFilter,
};
