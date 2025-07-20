function normalize(str) {
    return str.trim().toLowerCase().replace(/\s+/g, '');
}
function compareStrings(str1, str2) {
    if (normalize(str1) === normalize(str2)) {
        return true;
    }
    return false;
}


export default { normalize, compareStrings };