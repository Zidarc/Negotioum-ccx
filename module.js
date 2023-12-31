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

document.getElementById("liquidate").addEventListener("click", async function() {
    try {
        let cointype = document.getElementById("CoinType").value;
        let transactiontype = 2
        const teamId = getTeamId();
        let index;
        if (cointype === "bitcoin") {
            index = 0;
        } else if (cointype === "polkadot") {
            index = 1;
        } else if (cointype === "luna") {
            index = 2;
        } else if (cointype === "dogecoin") {
            index = 3;
        } else if (cointype === "xrp") {
            index = 4;
        } else if (cointype === "bnb") {
            index = 5;
        } else if (cointype === "eth"){
            index = 6;
        } else {
            console.error("Invalid coinType:", coinType);
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Invalid coinType" }),
            };
        }
        let coinamount = userCoins[index];
        let masterprice = masterCoin[index];
        let coinval = masterprice * coinamount;
        const response = await fetch(`/.netlify/functions/update?cointype=${cointype}&teamId=${teamId}&transactiontype=${transactiontype}&coinval=${coinval}`);
        //const total = await fetch(`/.netlify/functions/totalworth?teamId=${teamId}`);
        await readdata();
    } catch (error) {
        //document.getElementById("statusN").innerText = " Error: " + error;
    }
    
});


const updateInput = document.getElementById("update");
const buyingPowerDiv = document.querySelector(".buying-power");
const coinTypeInput = document.getElementById("CoinType");


updateInput.addEventListener("input", calculateBuyingPower);
coinTypeInput.addEventListener("change", calculateBuyingPower);

function calculateBuyingPower() {
    try {
        const inputValue = updateInput.value;
        const coinType = coinTypeInput.value;

        let indexs;

        if (coinType === "bitcoin") {
            indexs = 0;
        } else if (coinType === "polkadot") {
            indexs = 1;
        } else if (coinType === "luna") {
            indexs = 2;
        } else if (coinType === "dogecoin") {
            indexs = 3;
        } else if (coinType === "xrp") {
            indexs = 4;
        } else if (coinType === "bnb") {
            indexs = 5;
        } else if (coinType === "eth") {
            indexs = 6;
        } else {
            console.error("Invalid coinType:", coinType);
            return;
        }

        if (indexs === undefined) {
            console.error("Invalid coinType:", coinType);
            return;
        }

        const content = inputValue / masterCoin[indexs];

        buyingPowerDiv.textContent = ` ${content}`;
    } catch (error) {
        console.error("Error in the calculation:", error);
    }
}



