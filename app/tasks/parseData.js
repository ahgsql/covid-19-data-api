import fs from 'fs';
import csv from 'csv-parse';
import Logger from '../loaders/logger';
import Utils from '../utils';
import config from '../config';

async function readData(sourceFiles) {
    const results = [];

    try {
        for (const file of sourceFiles) {
            const localSourceDir = Utils.normalizePath(config.dataPath);
            results[file.type] = csv(fs.createReadStream(localSourceDir + file.name));
        }
    } catch (error) {
        Logger.error(error);
        throw new Error(error);
    }

    return results;
}

async function parseAllData() {
    console.log('Does nothing for now.');
}

export default parseAllData;
