import fs from 'fs';

export const config = {
    port: 4000,
    ssl: {
        key: fs.readFileSync('./certs/covid-19-test-ssl.key', 'utf8'),
        cert: fs.readFileSync('./certs/covid-19-test-ssl.crt', 'utf8'),
    },
};
