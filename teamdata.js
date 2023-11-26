let teamname;
let teampass;
export function setData(TN, PS){
    teamname = TN;
    teampass = PS;
}
export function getTN(){
    return teamname
}
export function getPS(){
    return teampass
}