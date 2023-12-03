export function setTeamId(id) {
    localStorage.setItem('teamdata',id);
}
export function getTeamId() {
    return localStorage.getItem('teamdata');
} 