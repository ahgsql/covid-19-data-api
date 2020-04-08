import expressLoader from './express';
import Logger from './logger';

function initLoader(expressApp) {
    expressLoader(expressApp);

    Logger.info('Express has loaded.');
}

export default initLoader;
