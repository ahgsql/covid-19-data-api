/**
 * @async
 * @function getDirectory
 * @description Checks if directory exists and can create it if it doesn't.
 *
 * @param { string } dir The directory to be fetched / validated.
 * @param { boolean } makeDir Create directory if it does not exist.
 *
 * @returns { boolean|string } False if directory doesn't exist, path string
 *                             if directory exists or is created.
 */

import fs from 'fs';

async function getDirectory(dir, makeDir = true) {
    // Check if directory parameter was provided for the function.
    if (typeof dir === 'undefined' || dir === null) {
        throw new Error(
            'No path was specified, unable to check for directory existence.'
        );
    }

    // Use `fs.stat()` to verify existence of directory.
    await fs.stat(dir, (error) => {
        // If the `makeDir` is set to true, it'll be created.
        if (error && makeDir) {
            return fs.mkdir(dir, (err) => {
                if (err) throw new Error(err);
            });
        }

        // Simply throw an error if `makeDir` is false.
        if (error) throw new Error(error);
    });

    return dir;
}

export default getDirectory;
