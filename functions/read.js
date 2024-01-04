const mongoose = require("mongoose");
const UserData = require("../models/userdata");

exports.handler = async (event, context) => {
    let connection;

    try {
        // Connect to MongoDB and reuse the connection
        connection = await mongoose.createConnection('mongodb+srv://alihussain:Kampala1980@cluster0.15cptjw.mongodb.net/?retryWrites=true&w=majority');

        // Extract team name from the query parameters
        const teamName = event.queryStringParameters && event.queryStringParameters.teamName;

        if (!teamName) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Team name is missing in the request parameters" }),
            };
        }

        // Find data for the specified team
        const data = await UserData.findOne({ Team_password: teamName });

        if (!data) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: `Team '${teamName}' not found` }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    } finally {
        // Close the connection in the finally block to ensure it's closed even in case of an error
        if (connection) {
            await connection.close();
        }
    }
};
