const mongoose = require("mongoose");
const UserData = require("../models/userdata");
exports.handler = async (event, context) => {
    try {
        mongoose.connect('mongodb+srv://alihussain:Kampala1980@cluster0.15cptjw.mongodb.net/?retryWrites=true&w=majority');

        // Extract team name from the query parameters
        const globalVariable = require("../login.js")

        if (!globalVariable.x) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Team name is missing in the request parameters" }),
            };
        };
        NewCoins = GetCoinVal();
        const updatevalues = require('../module.js');
        UserData.findByIdAndUpdate(globalVariable.x, {coins:updatevalues.newvalues})
        .then((data) => {
            if(!data) {
                return res.status(404).send("Document not found.");
            }
            return res,status(200).send("Document updated succesfully.")
        })
        .catch((err) =>{
            return res.status(500).send(err);
        });
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({error:"Internal Servor Error"}),
        };
    }
};
