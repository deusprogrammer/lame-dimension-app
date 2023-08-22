export const getDiff = (elementPath, diff) => {
    if (!diff) {
        return false;
    }

    let found = diff.filter(({ path }) => path.startsWith(elementPath));

    if (!found) {
        return false;
    }

    return found.length > 0;
};
