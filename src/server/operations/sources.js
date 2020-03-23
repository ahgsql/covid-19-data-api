import fs from 'fs';
import https from 'https';
import { config } from '../../config';

const sourceDirectory = './src/sources/';

async function updateSource(sourceURL, sourceName) {
    return new Promise((resolve, reject) => {
        const requestSourceFile = https.get(
            `${sourceURL + sourceName}`,
            (response) => {
                if (response.statusCode < 200 || response.statusCode >= 300) {
                    return reject(
                        new Error(
                            `Failed to get source file with status code: ${response.statusCode}.`
                        )
                    );
                }

                fs.stat(sourceDirectory, (error) => {
                    if (error) {
                        console.log(
                            "Sources directory doesn't exist, creating it now..."
                        );

                        return fs.mkdir(sourceDirectory, (error) => {
                            if (error) throw error;
                        });
                    }
                });

                let writeSource = fs.createWriteStream(
                    sourceDirectory + sourceName
                );

                response.pipe(writeSource);

                response.on('end', () => {
                    console.log(
                        `Source for '${sourceName}' has been successfully updated.`
                    );

                    return resolve();
                });

                writeSource.on('error', (error) => {
                    if (error) throw error;
                });
            }
        );

        requestSourceFile.on('error', (error) => reject(error));

        requestSourceFile.end();
    });
}

export default async function updateAllSources(
    sourceBaseURL = config.sources.base,
    sourceFiles = config.sources.files
) {
    const requests = [];

    for (const file of sourceFiles) {
        const promise = updateSource(sourceBaseURL, file);

        requests.push(promise);
    }

    await Promise.all(requests);
}
