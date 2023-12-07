const mongoose = require("mongoose");
const UserData = require("../models/userdata");

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
        let index;
        let type;

        if (transactionType === "buy") {
            type = 1;
        } else {
            type = 2;
        }

        if (coinType === "bitcoin") {
            index = 0;
        } else if (coinType === "polkadot") {
            index = 1;
        } else if (coinType === "luna") {
            index = 2;
        } else if (coinType === "dogecoin") {
            index = 3;
        } else if (coinType === "xrp") {
            index = 4;
        } else if (coinType === "bnb") {
            index = 5;
        } else {
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
        const response = await fetch(` https://negotium-ccx.netlify.app/.netlify/functions/read?teamName=${teamId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        let userCoins = data.coins;
        let freeCoins = data.free_money;
        let userCoinVal = data.coins[index];
        

        // Fetch server data (assuming this should be "MasterCoins")
        const masterResponse = await fetch(` https://negotium-ccx.netlify.app/.netlify/functions/read?teamName=MasterCoins`);

        if (!masterResponse.ok) {
            throw new Error(`HTTP error! Status: ${masterResponse.status}`);
        }

        const serverData = await masterResponse.json();
        let masterCoin = serverData.coins;
        let serverCoinVal = serverData.coins[index];

        // Calculate total function
        async function calculateTotal() {
            // Your total calculation logic goes here
            // masterCoin array
            //userCoins array
            // how to add free coin in it, what to do now?
            // I can calculate free coin through two if statement if buy then user previous free coin - new calculated expense
            // if sell then previous free coin + new money etc
            if (type === 1) {
                freeCoins = freeCoins - parseFloat(coinVal).toFixed(3) * serverCoinVal
            } else {
                freeCoins = freeCoins + parseFloat(coinVal).toFixed(3) * serverCoinVal
            }
            if (masterCoins.length === userCoins.length) {
                const sum = masterCoins.reduce((acc, masterCoin, index) => acc + masterCoin * userCoins[index], 0);
              
                console.log("Sum of the product:", sum);
              } else {
                console.error("Arrays must have the same length for element-wise multiplication.");
              }
            let total = sum + freeCoins;
            return total;
        }

        if (type === 1) {
            if (coinVal <= (freeCoins / serverCoinVal)) {
                // Update in case of buying
                userCoins[index] = userCoinVal + parseFloat(coinVal).toFixed(3);
                    const updatedData = await UserData.findOneAndUpdate(
                    { Team_name: teamId },
                    {
                        $set: { [`coins.${index}`]: (userCoinVal + parseFloat(coinVal).toFixed(3)), 
                                total_worth: await calculateTotal()
                    },
                        $inc: { free_money: -(parseFloat(coinVal).toFixed(3) * serverCoinVal) },
                    },

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
            }
        } else if (type === 2) {
            if (coinVal <= userCoinVal) {
                userCoins[index] = userCoinVal - parseFloat(coinVal).toFixed(3);
                const updatedData = await UserData.findOneAndUpdate(
                    { Team_name: teamId },
                    {
                        $set: { [`coins.${index}`]: (userCoinVal - parseFloat(coinVal).toFixed(3)), 
                                total_worth: await calculateTotal()
                    },
                        $inc: { free_money: parseFloat(coinVal).toFixed(3) * serverCoinVal },
                    },
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
            }
        }
        




        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid transactionType or coinVal" }),
        };
    } catch (error) {
        console.error("Error in the function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
        };
    }
};
