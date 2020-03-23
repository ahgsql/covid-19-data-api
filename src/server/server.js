// Import required modules.
import cors from 'cors';
import express from 'express';
// import https from 'https';

// Import server configuration.
import { config } from '../config/config';

// Setup Express
const app = express();

app.disable('x-powered-by');

app.use(cors());

// Setup Server
const port = process.env.port || config.port;
// const httpsServer = https.createServer(config.ssl, app);

function initServer() {
    app.listen(port, () =>
        console.log(`REST API running on http://localhost:${port}`)
    );
}

export default initServer;
