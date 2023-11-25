let UteamName = '';
let Upassword = '';
let NewCoin = [];

export function setUserData(teamName, password) {
    UteamName = teamName;
    Upassword = password;
}

export function getUserData() {
    return { UteamName, Upassword };
}
export function SetCoinVal(Coin1){
    NewCoin= Coin1;
}
export function GetCoinVal() {
    return {NewCoin};
}