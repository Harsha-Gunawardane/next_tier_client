const countToString = (count) => {
    //get the count and cinvert 1000 - 1k  1500 - 1.5k  1000000 - 1m  1500000 - 1.5m
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'm';
    }
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'k';
    }
    return count;

}

export default countToString;