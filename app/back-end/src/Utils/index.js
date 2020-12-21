exports.compare = function (a, b) {
    if (a.creation < b.creation) {
        return -1;
    }
    if (a.creation > b.creation) {
        return 1;
    }
    return 0;
}