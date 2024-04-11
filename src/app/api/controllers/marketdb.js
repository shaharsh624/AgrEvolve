const mongoose = require("mongoose");
const { connectToMongoDBData, connectToMongoDBLocal } = require("../connect");

// Market Schema
const marketSchema = new mongoose.Schema({
    state_id: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    noOfDistricts: {
        type: Number,
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
            noOfMarkets: {
                type: Number,
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

// Commodities Schema
const commoditiesSchema = new mongoose.Schema({
    commodity_id: {
        type: Number,
        required: true,
    },
    commodity: {
        type: String,
        required: true,
    },
});

// Mongoose Models
const Markets = connectToMongoDBData.model("market", marketSchema);
const Commodities = connectToMongoDBData.model("commodity", commoditiesSchema);

// ---------------------------------- API Handlers ----------------------------------

// GET Commodities
// app.get("/api/commodities")
async function handleGetCommodities(req, res) {
    const result = await Commodities.find({});
    return res.json(result.map((commodities) => commodities["commodity"]));
}

// GET States
// app.get("/api/states")
async function handleGetStates(req, res) {
    const result = await Markets.find({});
    return res.json(result.map((states) => states["state"]));
}

// GET Districts
// app.get("/api/districts/:state")
async function handleGetDistricts(req, res) {
    const stateName = req.params.state;
    const state = await Markets.findOne({ state: stateName });
    const districts = state["districts"];
    return res.json(districts.map((district) => district["district"]));
}

// GET Markets
// app.get("/api/markets/:state/:district")
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

module.exports = {
    handleGetCommodities,
    handleGetStates,
    handleGetDistricts,
    handleGetMarkets,
};
