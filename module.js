document.getElementById("readButton").addEventListener("click", async function () {
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
document.getElementById("readButton").addEventListener("click", async function () {
    try {
        // Replace 'Ali' with the team name you want to query
        const teamName = 'Ali';
        const response = await fetch(`/.netlify/functions/read?teamName=${teamName}`);

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
            document.getElementById("statusU").innerText = "Data fetched successfully.";
        }
    } catch (error) {
        document.getElementById("status").innerText = "Error: " + error;
    }
});
document.getElementById("updateButton").addEventListener("click", function() {
    fetch("/.netlify/functions/update")
        .then(response => response.text())
        .then(data => {
            document.getElementById("status").innerText = data;
        })
        .catch(error => {
            document.getElementById("status").innerText = "Error: " + error;
        });
});
