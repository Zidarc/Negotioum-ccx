let UteamName = '';
let Upassword = '';

export function setUserData(teamName, password) {
    UteamName = teamName;
    Upassword = password;
}

export function getUserData() {
    return { UteamName, Upassword };
}