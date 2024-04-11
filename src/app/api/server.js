const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const {
    handleGetCommodities,
    handleGetStates,
    handleGetDistricts,
    handleGetMarkets,
} = require("./controllers/marketdb");

const {
    handleGetCommodity,
    handleCreateCommodity,
    handleGetCommodityFilter,
} = require("./controllers/commoditydb");

const {
    handleAddApikey,
    handleFetchApikey,
    authApikey,
} = require("./controllers/authdb");

const app = express();
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.json({ limit: "5000mb" }));
app.use(cors());

// Data
app.get("/api/commodities", authApikey, handleGetCommodities);
app.get("/api/states", authApikey, handleGetStates);
app.get("/api/districts/:state", authApikey, handleGetDistricts);
app.get("/api/markets/:state/:district", authApikey, handleGetMarkets);

// Commodities
app.get("/api/commodity/:commodity", authApikey, handleGetCommodity);
app.post("/api/commodity/create/:commodity", authApikey, handleCreateCommodity);
app.post("/api/commodity", authApikey, handleGetCommodityFilter);

// User
app.get("/api/user/createapikey", authApikey, handleAddApikey);
app.get("/api/user/apikeys", authApikey, handleFetchApikey);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server Running...`);
});
