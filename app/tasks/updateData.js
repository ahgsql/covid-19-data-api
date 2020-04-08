import fs from 'fs';
import https from 'https';
import Logger from '../loaders/logger';
import Utils from '../utils';
import config from '../config';

/**
 * @async
 * @function updateData
 * @description Creates/updates a singular data source file.
 *
 * @param { string } baseURL The base url directory where the file is located.
 * @param { string } fileName Name of file to be retrieved.
 * @param { string } localDirectory Directory to write files to.
 *
 * @returns { object } Promise of source update request.
 */
async function updateData(baseUrl, fileName, localDirectory) {
    return new Promise((resolve, reject) => {
        const requestSourceFile = https.get(`${baseUrl + fileName}`, (response) => {
            Logger.info(`Updating source for '${fileName}'...`);

            // Throw error if server responds with inappropriate status code.
            if (response.statusCode < 200 || response.statusCode >= 300) {
                return reject(new Error(`Failed to get source file with status code: ${response.statusCode}.`));
            }

            // Create stream to write file to.
            const writeSourceFile = fs.createWriteStream(localDirectory + fileName);

            response.pipe(writeSourceFile);

            writeSourceFile.on('error', (error) => {
                if (error) throw new Error(error);
            });

            response.on('end', () => resolve(Logger.info(`Source for '${fileName}' has been successfully updated.`)));
        });

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
async function updateAllData(
    sourceUrl = config.source.baseUrl,
    sourceFiles = config.source.files,
    localDirectory = config.dataPath
) {
    Logger.info('Fetching new data sets from upstream...');

    // Check and modify sourceDirectory path to ensure it has a trailing slash.
    const localDirectoryProper = Utils.normalizePath(localDirectory);

    // Check if source directory exists and create it if it doesn't.
    Utils.getDirectory(localDirectoryProper);

    const requests = [];

    // Create promises for each source file to be updated.
    for (const file of sourceFiles) {
        const promise = updateData(sourceUrl, file.name, localDirectoryProper);

        requests.push(promise);
    }

    try {
        await Promise.all(requests);
    } catch (error) {
        Logger.error(error);
        throw new Error(error);
    }

    Logger.info('All data sets have been updated.');
}

export default updateAllData;
