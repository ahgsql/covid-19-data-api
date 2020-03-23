/**
 * Application Configuration
 */

export const config = {
    // Server Port
    port: 4000,

    // Source Settings
    sources: {
        // Base URL for Sources
        base:
            'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-',

        // Source Filenames After Base URL
        files: ['Confirmed.csv', 'Deaths.csv', 'Recovered.csv'],
    },
};
