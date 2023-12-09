import { getTeamId } from "./teamdata.js";


document.addEventListener("DOMContentLoaded", async function () { 
    try {
        const teamName = 'MasterCoins';
        const response = await fetch(`/.netlify/functions/read?teamName=${teamName}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            document.getElementById("status").innerText = `Error: ${data.error}`;
        } else {
            document.getElementById("Bitcoin").innerHTML = "<pre>" + data.coins[0] + "</pre>";
            document.getElementById("Polkadot").innerHTML = "<pre>" + data.coins[1] + "</pre>";
            document.getElementById("Luna").innerHTML = "<pre>" + data.coins[2] + "</pre>";
            document.getElementById("Dogecoin").innerHTML = "<pre>" + data.coins[3] + "</pre>";
            document.getElementById("XRP").innerHTML = "<pre>" + data.coins[4] + "</pre>";
            document.getElementById("BNB").innerHTML = "<pre>" + data.coins[5] + "</pre>";
            document.getElementById("status").innerText = "Data fetched successfully.";
        }
        await readdata();
    } catch (error) {
        document.getElementById("status").innerText = "Error: " + error;
    }
});

async function readdata() {
    try {
        const teamId = getTeamId();
        const total = await fetch(`/.netlify/functions/update?teamId=${teamId}`);
        const response = await fetch(`/.netlify/functions/read?teamName=${teamId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.statusU}`);
        }

        const data = await response.json();

        if (data.error) {
            document.getElementById("statusU").innerText = `Error: ${data.error}`;
        } else {
            document.getElementById("BitcoinU").innerHTML = "<pre>" + data.coins[0] + "</pre>";
            document.getElementById("PolkadotU").innerHTML = "<pre>" + data.coins[1] + "</pre>";
            document.getElementById("LunaU").innerHTML = "<pre>" + data.coins[2] + "</pre>";
            document.getElementById("DogecoinU").innerHTML = "<pre>" + data.coins[3] + "</pre>";
            document.getElementById("XRPU").innerHTML = "<pre>" + data.coins[4] + "</pre>";
            document.getElementById("BNBU").innerHTML = "<pre>" + data.coins[5] + "</pre>";
            document.getElementById("FreeMoney").innerHTML = "<pre>" + data.free_money + "</pre>";
            document.getElementById("TotalWorth").innerHTML = "<pre>" + data.total_worth + "</pre>";
            document.getElementById("statusU").innerText = "Data fetched successfully.";
        }
    } catch (error) {
        document.getElementById("statusU").innerText = "Error: " + error;
    }
}

document.getElementById("readSelectedValue").addEventListener("click", async function() {
    try {
        let cointype = document.getElementById("CoinType").value;
        let transactiontype = document.getElementById("transactionType").value;
        let coinval = document.getElementById("update").value;
        const teamId = getTeamId();
        const response = await fetch(`/.netlify/functions/update?cointype=${cointype}&teamId=${teamId}&transactiontype=${transactiontype}&coinval=${coinval}`);
        const total = await fetch(`/.netlify/functions/update?teamId=${teamId}`);
        await readdata();
    } catch (error) {
        document.getElementById("statusN").innerText = " Error: " + error;
    }
});

