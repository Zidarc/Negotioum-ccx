export function setTeamId(id) {
    sessionStorage.setItem('teamdata',id);
}
export function getTeamId() {
    return sessionStorage.getItem('teamdata');
}