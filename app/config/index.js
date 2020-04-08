import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default.
process.env.NODE_ENV = process.env.NODE_ENV || 'default';

const getEnv = dotenv.config();

// Exit the application if no env file is found.
if (getEnv.error) {
    throw new Error("Couldn't find .env file.");
}

const config = {
    // Port to run application on via Express.
    port: parseInt(process.env.PORT, 10) || 8000,

    // Local storage directory for data sources.
    dataPath: process.env.DATA_PATH || './app/sources/',

    // Set API Route Prefix
    api: {
        prefix: process.env.API_PREFIX || '/api',
    },

    // Set Winston logging parameters.
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },

    // Settings for data retrieval.
    source: {
        baseUrl:
            'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_',
        files: [
            {
                type: 'confirmed',
                name: 'confirmed_global.csv',
            },
            {
                type: 'deaths',
                name: 'deaths_global.csv',
            },
            {
                type: 'recovered',
                name: 'recovered_global.csv',
            },
        ],
    },
};

export default config;
