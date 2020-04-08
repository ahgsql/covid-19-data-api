/**
 * @async
 * @function normalizePath
 * @description Ensures provided path is returned with a trailing slash.
 *
 * @param { string } path The path string to be normalized.
 *
 * @returns { string } Path with a trailing slash if needed.
 */

function normalizePath(path) {
    let result = path;

    result = result.replace(/\/?$/, '/');

    return result;
}

export default normalizePath;
