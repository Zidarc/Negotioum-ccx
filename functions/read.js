
const mongoose = require("mongoose");
const UserData = require("../models/userdata");

exports.handler = async (event, context) => {
    try {
        mongoose.connect('mongodb+srv://alihussain:Kampala1980@cluster0.15cptjw.mongodb.net/?retryWrites=true&w=majority');

        const data = await UserData.find();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};
