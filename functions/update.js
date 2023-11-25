const mongoose = require("mongoose");
const UserData = require("../models/userdata");

exports.handler = async (event, context) => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://alihussain:Kampala1980@cluster0.15cptjw.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Extract team name from the query parameters
        const globalVariable = require("../login.js");

        if (!globalVariable.x) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Team name is missing in the request parameters" }),
            };
        }

        // Assuming GetCoinVal is a function returning an array of coin values
        const newCoins = GetCoinVal();

        // Import updatevalues from module.js
        const updatevalues = require('../module.js');

        // Update the UserData document
        const updatedData = await UserData.findOneAndUpdate(
            { _id: globalVariable.x },
            { coins: updatevalues.newvalues },
            { new: true } // Return the modified document rather than the original
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
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
        };
    }
};
