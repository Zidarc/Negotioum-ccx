import { setTeamId } from "./teamdata.js";
function setTeamIdAfterLogin(id) {
    setTeamId(id);
}

window.addEventListener('pageshow', function(event) {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        setTeamIdAfterLogin("");
        document.getElementById('teamName').value = "";
        document.getElementById('password').value = "";
    }
});
async function signIn() {
    const Uteamname = document.getElementById('teamName').value;
    const Upassword = document.getElementById('password').value;
    setTeamIdAfterLogin(Uteamname);
    if (!Uteamname || !Upassword) {
        document.getElementById('errorbox').innerText = "Please enter the values in.";
    } else {
        try {
            const response = await fetch(`/.netlify/functions/read?teamName=${Uteamname}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                document.getElementById("status").innerText = `Error: ${data.error}`;
            } else {
                const Spassword = data.Team_password;

                if (Spassword === Upassword) {
                    // Redirect to index.js or another page on the server side
                    window.location.href = '/user.html'; // Adjust the URL as needed
                } else {
                    document.getElementById('errorbox').innerText = "Password Wrong";
                }
            }
        } catch (error) {
            document.getElementById('errorbox').innerText = "An error occurred during sign-in.";
        }
    }
}

window.signIn = signIn;