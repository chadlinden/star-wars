export const extractIdFromUrl = (url) => {
    if (!url) {
        return 0;
    }

    const parts = url.split('/');
    let possibleNumber = parseInt(parts.pop(), 10);
    if (isNaN(possibleNumber)) {
        possibleNumber = parseInt(parts.pop(), 10);
    }

    return isNaN(possibleNumber) ? 0 : possibleNumber;
}

export function mergePeopleMap(originalMap, newMap) {
    return originalMap.merge(newMap.map(person => [extractIdFromUrl(person.url), person]))
        .sort((a, b) => {
            if (a < b) { return -1; }
            if (a > b) { return 1; }
            if (a === b) { return 0; }
        });
}

export const toSnakeCase = (str = '') => {
    const strArr = str.split(' ');
    const snakeArr = strArr.reduce((acc, val) => {
        return acc.concat(val.toLowerCase());
    }, []);
    return snakeArr.join('_');
};

export default {
    toSnakeCase,
    mergePeopleMap,
    extractIdFromUrl
}
