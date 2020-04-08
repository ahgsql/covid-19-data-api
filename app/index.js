import express from 'express';
import initLoaders from './loaders';
import Logger from './loaders/logger';
import Task from './tasks';
import config from './config';

async function initApp() {
    const app = express();

    initLoaders(app);

    await Task.updateData();

    await Task.parseData();

    // Start API server.
    app.listen(config.port, (error) => {
        if (error) {
            Logger.error(error);

            process.exit(1);

            return;
        }

        Logger.info(`API server started and listening on port: ${config.port}`);
    });
}

initApp();
