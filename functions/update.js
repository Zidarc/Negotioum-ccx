const mongoose = require("mongoose");
const UserData = require("../models/userdata");
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://alihussain:Kampala1980@cluster0.15cptjw.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const coinType = event.queryStringParameters && event.queryStringParameters.cointype;
        const transactionType = event.queryStringParameters && event.queryStringParameters.transactiontype;
        const coinVal = event.queryStringParameters && event.queryStringParameters.coinval;
        const teamId = event.queryStringParameters && event.queryStringParameters.teamId;

        // Map coin types to indices
        const coinTypeToIndex = {
            "bitcoin": 0,
            "polkadot": 1,
            "luna": 2,
            "dogecoin": 3,
            "xrp": 4,
            "bnb": 5,
        };

        const index = coinTypeToIndex[coinType];

        if (index === undefined) {
            console.error("Invalid coinType:", coinType);
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Invalid coinType" }),
            };
        }

        if (!teamId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Team name is missing in the request parameters" }),
            };
        }

        // Fetch user data
        const response = await fetch(`https://negotium-ccx.netlify.app/.netlify/functions/read?teamName=${teamId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const userCoins = data.coins;
        const freeCoins = data.free_money;
        const userCoinVal = userCoins[index];

        // Fetch server data (assuming this should be "MasterCoins")
        const masterResponse = await fetch(`https://negotium-ccx.netlify.app/.netlify/functions/read?teamName=MasterCoins`);

        if (!masterResponse.ok) {
            throw new Error(`HTTP error! Status: ${masterResponse.status}`);
        }

        const serverData = await masterResponse.json();
        const masterCoin = serverData.coins;
        const serverCoinVal = masterCoin[index];

        // Calculate total function

        async function calculateTotal() {
            let sum = 0;
            // Calculate the sum of products of corresponding elements
            if (masterCoin.length === userCoins.length) {
                sum = masterCoin.reduce((acc, masterCoinVal, idx) => acc + masterCoinVal * userCoins[idx], 0);
                // Calculate total by adding sum and freeCoins
                const total = sum + freeCoins;
                return total;
            } else {
                console.error("Arrays must have the same length for element-wise multiplication.");
                return null;
            }
        }

        // Update in case of buying or selling
        const type = transactionType === "buy" ? 1 : 2; // Set type based on transaction type
        const updatedData = await UserData.findOneAndUpdate(
            { Team_name: teamId },
            {
                $set: {
                    [`coins.${index}`]: type === 1 ? (userCoinVal + parseFloat(coinVal).toFixed(3)) : (userCoinVal - parseFloat(coinVal).toFixed(3)),
                    total_worth: await calculateTotal()
                },
                $inc: {
                    free_money: type === 1 ? -(parseFloat(coinVal).toFixed(3) * serverCoinVal) : parseFloat(coinVal).toFixed(3) * serverCoinVal,
                },
            },
            { new: true }
        );

        if (!updatedData) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Document not found." }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Document updated successfully.", data: updatedData }),
        };

    } catch (error) {
        console.error("Error in the function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
        };
    }
};
