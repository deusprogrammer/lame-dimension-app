export const getDiff = (elementPath, diff) => {
    if (!diff) {
        return false;
    }

    console.log("DIFF: " + JSON.stringify(diff, null, 5));

    let found = diff.filter(({path}) => (path.startsWith(elementPath)));
    
    if (!found) {
        return false;
    }

    console.log("FOUND: " + (found.length > 0));

    return found.length > 0;
}