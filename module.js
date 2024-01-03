import { getTeamId } from "./teamdata.js";
let masterCoin;
let userCoins;
let freeCoins;

document.addEventListener("DOMContentLoaded", async function() {
    await master();
});
async function master() {
    try {
        const teamName = 'MasterCoins';
        const response = await fetch(`/.netlify/functions/read?teamName=${teamName}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        masterCoin = data.coins;
        if (data.error) {
            //document.getElementById("status").innerText = `Error: ${data.error}`;
        } else {
            const coinId = ["Bitcoin", "Polkadot", "Luna", "Dogecoin", "XRP", "BNB", "Ethereum"];

            coinId.forEach((coinId, index) => {
                const htmlContent = `<pre>${data.coins[index]}</pre>`;
                document.getElementById(coinId).innerHTML = htmlContent;
            });
            //document.getElementById("status").innerText = "Data fetched successfully.";


            const pccoinIds = ["BTC", "DOT", "LUNA", "DOGE", "XRP", "BNB", "ETH"];

            pccoinIds.forEach((coinId, index) => {
                const priceChangeId = `PriceChange${coinId}`;
                const htmlContent = `<pre>${data.coins_previous[index]}</pre>`;
                document.getElementById(priceChangeId).innerHTML = htmlContent;
            });
            
           // document.getElementById("status").innerText = "Data fetched successfully.";

           const coinIds = ["BTC", "DOT", "Terra", "DOGE", "xrp", "bnb", "ETH"];

           coinIds.forEach((coinId, index) => {
               const trendClass = data.coins_previous[index] > 0 ? "trending_up" :
                                  data.coins_previous[index] < 0 ? "trending_down" :
                                  "unknown_med";
               
               document.getElementById(coinId).innerText = trendClass;
           });

            coinIds.forEach((coinId) => {
                const coinDiv = document.getElementById(coinId);
        
                const coinValue = coinDiv.textContent;

                coinDiv.classList.remove("trending-green", "trending-red", "trend-black");
        
                if (coinValue === "trending_up") {
                    coinDiv.classList.add("trending-green");
                } else if (coinValue === "trending_down") {
                    coinDiv.classList.add("trending-red");
                } else {
                    coinDiv.classList.add("trend-black");
                }
        });
            
        }
    } catch (error) {
        //document.getElementById("status").innerText = "Error: " + error;
    }finally{
        await readdata();
    }
};

async function readdata() {
    try {
        const teamId = getTeamId();
        //const total = await fetch(`/.netlify/functions/totalworth?teamId=${teamId}`);
        const response = await fetch(`/.netlify/functions/read?teamName=${teamId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.statusU}`);
        }

        const data = await response.json();
        userCoins = data.coins;
        freeCoins = data.free_money;
        let sum = freeCoins + (masterCoin.reduce((acc, masterCoinVal, index) => acc + masterCoinVal * userCoins[index], 0));
        sum = +sum.toFixed(3);
        if (data.error) {
            //document.getElementById("statusU").innerText = `Error: ${data.error}`;
        } else {
            const coinIdsU = ["BitcoinU", "PolkadotU", "LunaU", "DogecoinU", "XRPU", "BNBU", "EthereumU"];

            coinIdsU.forEach((coinId, index) => {
                const htmlContent = `<pre>${data.coins[index]}</pre>`;
                document.getElementById(coinId).innerHTML = htmlContent;
            });
                   
            document.getElementById("FreeMoney").innerHTML = "<pre>" + data.free_money + "</pre>";
            document.getElementById("TotalWorth").innerHTML = "<pre>" + sum + "</pre>";

            };

    } catch (error) {
        //document.getElementById("statusU").innerText = "Error: " + error;
    }
}

document.getElementById("readSelectedValue").addEventListener("click", async function() {
    try {
        let cointype = document.getElementById("CoinType").value;
        let transactiontype = document.getElementById("transactionType").value;
        let coinval = document.getElementById("update").value;
        const teamId = getTeamId();
        const response = await fetch(`/.netlify/functions/update?cointype=${cointype}&teamId=${teamId}&transactiontype=${transactiontype}&coinval=${coinval}`);
        //const total = await fetch(`/.netlify/functions/totalworth?teamId=${teamId}`);
        await readdata();
    } catch (error) {
        //document.getElementById("statusN").innerText = " Error: " + error;
    }
});

const updateInput = document.getElementById("update");
const buyingPowerDiv = document.querySelector(".buying-power");

updateInput.addEventListener("input", function() {
    // Get the input value and convert it to a float, defaulting to 0 if not a valid number
    const inputValue = parseFloat(updateInput.value) || 0;

    // Get the selected coin type from the "CoinType" dropdown
    const coinType = document.getElementById("CoinType").value;

    // Map coin types to their respective index
    const coinTypeToIndex = {
        "bitcoin": 0,
        "polkadot": 1,
        "luna": 2,
        "dogecoin": 3,
        "xrp": 4,
        "bnb": 5,
        "eth": 6
    };

    // Get the index based on the selected coin type
    const index = coinTypeToIndex[coinType];

    // Check if the selected coin type is valid
    if (index === undefined) {
        console.error("Invalid coinType:", coinType);
        return;
    }

    // Array of coin IDs
    const coinId = ["Bitcoin", "Polkadot", "Luna", "Dogecoin", "XRP", "BNB", "Ethereum"];

    // Get the value of the selected coin
    const mCoin = parseFloat(document.getElementById(coinId[index]).value) || 1; // Default to 1 if not a valid number

    // Calculate the content based on the input value and the selected coin value
    const content = inputValue / mCoin;

    // Update the content of the buying-power div
    buyingPowerDiv.textContent = ` ${content.toFixed(8)}`; // Display up to 3 decimal places
});


