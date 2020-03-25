import fs from 'fs';
import https from 'https';

// Import Utilities
import Utils from '../../utils';

// Import Configuration
import { config } from '../../config';

/**
 * @async
 * @function updateSource
 * @description Creates/updates a singular data source file.
 *
 * @param { string } baseURL The base url directory where the file is located.
 * @param { string } fileName Name of file to be retrieved.
 * @param { string } localDirectory Directory to write files to.
 *
 * @returns { object } Promise of source update request.
 */
async function updateSource(baseURL, fileName, localDirectory) {
    return new Promise((resolve, reject) => {
        const requestSourceFile = https.get(
            `${baseURL + fileName}`,
            (response) => {
                console.log(`Updating source for '${fileName}'...`);

                // Throw error if server responds with inappropriate status code.
                if (response.statusCode < 200 || response.statusCode >= 300) {
                    return reject(
                        new Error(
                            `Failed to get source file with status code: ${response.statusCode}.`
                        )
                    );
                }

                // Create stream to write file to.
                const writeSourceFile = fs.createWriteStream(
                    localDirectory + fileName
                );

                response.pipe(writeSourceFile);

                writeSourceFile.on('error', (error) => {
                    if (error) throw new Error(error);
                });

                response.on('end', () =>
                    resolve(
                        console.log(
                            `Source for '${fileName}' has been successfully updated.`
                        )
                    )
                );
            }
        );

        requestSourceFile.on('error', (error) => reject(new Error(error)));

        // End request.
        requestSourceFile.end();
    });
}

/**
 * @async
 * @function updateAllSources
 * @description Creates/updates all data source files.
 *
 * @param { string } sourceBaseURL The base url directory where the files are located.
 * @param { array } sourceFiles Array of source file objects to update.
 * @param { string } sourceDirectory Directory where source files are written.
 *
 * @returns { object } Promises of source update requests.
 */
export default async function updateAllSources(
    sourceBaseURL = config.sources.base,
    sourceFiles = config.sources.files,
    sourceDirectory = config.sources.localDir
) {
    // Check if source directory exists and create it if it doesn't.
    Utils.getDirectory(sourceDirectory);

    const requests = [];

    // Create promises for each source file to be updated.
    for (const file of sourceFiles) {
        const promise = updateSource(sourceBaseURL, file.name, sourceDirectory);

        requests.push(promise);
    }

    await Promise.all(requests);
}
