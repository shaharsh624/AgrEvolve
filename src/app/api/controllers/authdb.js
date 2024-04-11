const mongoose = require("mongoose");
const { connectToMongoDBUsers } = require("../connect");

const apiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    hashedAPIKey: {
        type: String,
        required: true,
    },
    apiKey: {
        type: String,
        required: true,
    },
});

mongoose.pluralize(null);
const Apikey = connectToMongoDBUsers.model("apikeys", apiSchema);

function generateAPIKey() {
    const { randomBytes } = require("crypto");
    const apiKey = randomBytes(16).toString("hex");
    const hashedAPIKey = hashAPIKey(apiKey);

    // Ensure API key is unique
    //if (apiKeys[hashedAPIKey]) {
    //    generateAPIKey();
    //} else {
    return { hashedAPIKey, apiKey };
    //}
}

// Hash the API key
function hashAPIKey(apiKey) {
    const { createHash } = require("crypto");
    const hashedAPIKey = createHash("sha256").update(apiKey).digest("hex");
    return hashedAPIKey;
}

const handleAddApikey = async (req, res) => {
    try {
        var name = req.query.name;
        var desc = req.query.desc;
        const { hashedAPIKey, apiKey } = generateAPIKey();
        const newApi = {
            name: name,
            desc: desc,
            hashedAPIKey: hashedAPIKey,
            apiKey: apiKey,
        };

        await Apikey.insertMany(newApi);
        return res.status(200).json({
            message: `Successfully created API key`,
        });
    } catch (error) {
        console.error("Error adding API key:", error);
    }
};

const handleFetchApikey = async (req, res) => {
    try {
        const data = await Apikey.find({});
        return res.json(data);
    } catch (error) {
        console.error("Error fetching API key:", error);
    }
};

async function checkApiKey(apiKey) {
    try {
        const item = await Apikey.findOne({ apiKey: apiKey });
        return item;
    } catch (error) {
        console.error("Error checking API key:", error);
        throw error;
    }
}

const authApikey = async (req, res, next) => {
    const apiKey = req.headers["api-key"];

    try {
        const item = await checkApiKey(apiKey);
        if (item) {
            next();
        } else {
            return res.status(401).json({ error: "Unauthorized" });
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { handleAddApikey, handleFetchApikey, authApikey };
