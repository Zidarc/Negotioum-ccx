// Example usage
import { UserTeamName } from "./login";
import { UserPassword } from "./login";
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
    } catch (error) {
        document.getElementById("status").innerText = "Error: " + error;
    }
});
document.addEventListener("DOMContentLoaded", async function () {
    try {

        const response = await fetch(`/.netlify/functions/read?teamName=${UserTeamName}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            document.getElementById("status").innerText = `Error: ${data.error}`;
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


            document.getElementById("BitcoinN").value = data.coins[0];
            document.getElementById("PolkadotN").value = data.coins[1];
            document.getElementById("LunaN").value = data.coins[2];
            document.getElementById("DogecoinN").value = data.coins[3];
            document.getElementById("XRPN").value = data.coins[4];
            document.getElementById("BNBN").value = data.coins[5];
            document.getElementById("FreeMoneyN").innerHTML = "<pre>" + data.free_money + "</pre>";
            document.getElementById("TotalWorthN").innerHTML = "<pre>" + data.total_worth + "</pre>";
            document.getElementById("statusN").innerText = "Data fetched successfully.";
        }
    } catch (error) {
        document.getElementById("status").innerText = "Error: " + error;
    }
});
document.getElementById("updateButton").addEventListener("click", function() {
    let COIN1 = document.getElementById("BitcoinN").value
    let COIN2 = document.getElementById("PolkadotN").value
    let COIN3 = document.getElementById("LunaN").value
    let COIN4 = document.getElementById("DogecoinN").value
    let COIN5 = document.getElementById("XRPN").value
    let COIN6 = document.getElementById("BNBN").value
    let Newval = [COIN1, COIN2, COIN3, COIN4, COIN5, COIN6];
    const updatevalues = {
        newvalues: Newval
      };
      module.exports = updatevalues;
    fetch("/.netlify/functions/update")
        .then(response => response.text())
        .then(data => {
            document.getElementById("status").innerText = data;
        })
        .catch(error => {
            document.getElementById("status").innerText = "Error: " + error;
        });
});
