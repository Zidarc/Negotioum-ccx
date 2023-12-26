import { getTeamId } from "./teamdata.js";
let masterCoin;
let userCoins;
let freeCoins;
document.addEventListener("DOMContentLoaded", async function () { 
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
            document.getElementById("Bitcoin").innerHTML = "<pre>" + data.coins[0] + "</pre>";
            document.getElementById("Polkadot").innerHTML = "<pre>" + data.coins[1] + "</pre>";
            document.getElementById("Luna").innerHTML = "<pre>" + data.coins[2] + "</pre>";
            document.getElementById("Dogecoin").innerHTML = "<pre>" + data.coins[3] + "</pre>";
            document.getElementById("XRP").innerHTML = "<pre>" + data.coins[4] + "</pre>";
            document.getElementById("BNB").innerHTML = "<pre>" + data.coins[5] + "</pre>";
            document.getElementById("Ethereum").innerHTML = "<pre>" + data.coins[6] + "</pre>";
            //document.getElementById("status").innerText = "Data fetched successfully.";

            document.getElementById("PriceChangeBTC").innerHTML = "<pre>" + data.coins_previous[0] + "</pre>";
            document.getElementById("PriceChangeDOT").innerHTML = "<pre>" + data.coins_previous[1] + "</pre>";
            document.getElementById("PriceChangeLUNA").innerHTML = "<pre>" + data.coins_previous[2] + "</pre>";
            document.getElementById("PriceChangeDOGE").innerHTML = "<pre>" + data.coins_previous[3] + "</pre>";
            document.getElementById("PriceChangeXRP").innerHTML = "<pre>" + data.coins_previous[4] + "</pre>";
            document.getElementById("PriceChangeBNB").innerHTML = "<pre>" + data.coins_previous[5] + "</pre>";
            document.getElementById("PriceChangeETH").innerHTML = "<pre>" + data.coins_previous[6] + "</pre>";
           // document.getElementById("status").innerText = "Data fetched successfully.";

            document.getElementById("BTC").innerText = 
                data.coins_previous[0] > 0 ? "trending_up" :
                data.coins_previous[0] < 0 ? "trending_down" :
                "unknown_med";
            document.getElementById("DOT").innerText = 
                data.coins_previous[1] > 0 ? "trending_up" :
                data.coins_previous[1] < 0 ? "trending_down" :
                "unknown_med";
            document.getElementById("Terra").innerText = 
                data.coins_previous[2] > 0 ? "trending_up" :
                data.coins_previous[2] < 0 ? "trending_down" :
                "unknown_med";
            document.getElementById("DOGE").innerText = 
                data.coins_previous[3] > 0 ? "trending_up" :
                data.coins_previous[3] < 0 ? "trending_down" :
                "unknown_med";
            document.getElementById("xrp").innerText = 
                data.coins_previous[4] > 0 ? "trending_up" :
                data.coins_previous[4] < 0 ? "trending_down" :
                "unknown_med";
            document.getElementById("bnb").innerText = 
                data.coins_previous[5] > 0 ? "trending_up" :
                data.coins_previous[5] < 0 ? "trending_down" :
                "unknown_med";
            document.getElementById("ETH").innerText = 
                data.coins_previous[6] > 0 ? "trending_up" :
                data.coins_previous[6] < 0 ? "trending_down" :
                "unknown_med";
        
            
        }
    } catch (error) {
        //document.getElementById("status").innerText = "Error: " + error;
    }finally{
        await readdata();
    }
});

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
        if (data.error) {
            document.getElementById("statusU").innerText = `Error: ${data.error}`;
        } else {
            document.getElementById("BitcoinU").innerHTML = "<pre>" + data.coins[0] + "</pre>";
            document.getElementById("PolkadotU").innerHTML = "<pre>" + data.coins[1] + "</pre>";
            document.getElementById("LunaU").innerHTML = "<pre>" + data.coins[2] + "</pre>";
            document.getElementById("DogecoinU").innerHTML = "<pre>" + data.coins[3] + "</pre>";
            document.getElementById("XRPU").innerHTML = "<pre>" + data.coins[4] + "</pre>";
            document.getElementById("BNBU").innerHTML = "<pre>" + data.coins[5] + "</pre>";
            document.getElementById("EthereumU").innerHTML = "<pre>" + data.coins[6] + "</pre>";            
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

