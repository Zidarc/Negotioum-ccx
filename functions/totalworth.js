const mongoose = require("mongoose");
const UserData = require("../models/userdata");

exports.handler = async (event, context) => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://alihussain:Kampala1980@cluster0.15cptjw.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const teamId = event.queryStringParameters && event.queryStringParameters.teamId;

        // Fetch data from external API
        const response = await fetch(`https://negotium-ccx.netlify.app/.netlify/functions/read?teamName=${teamId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const userCoins = data.coins;
        const freeCoins = data.free_money;

        // Fetch master data
        const masterResponse = await fetch(`https://negotium-ccx.netlify.app/.netlify/functions/read?teamName=MasterCoins`);

        if (!masterResponse.ok) {
            throw new Error(`HTTP error! Status: ${masterResponse.status}`);
        }

        const serverData = await masterResponse.json();
        const masterCoin = serverData.coins;

        // Calculate total
        let sum;

        if (masterCoin.length === userCoins.length) {
            sum = masterCoin.reduce((acc, masterCoinVal, index) => acc + masterCoinVal * userCoins[index], 0);
            console.log("Sum of the product:", sum);
        } else {
            console.error("Arrays must have the same length for element-wise multiplication.");
        }

        const total = sum + freeCoins;

        // Update the document in MongoDB
        const updatedData = await UserData.findOneAndUpdate(
            { Team_name: teamId },
            { $set: { total_worth: total } },
            { new: true } // Return the updated document
        );

        if (!updatedData) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: "Document not found for teamId: " + teamId }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Document updated successfully.", data: updatedData }),
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
