/**
 * Server Entry Point
 */

// Import Required Modules
import cors from 'cors';
import express from 'express';

// Import Server Operations
import Operation from './operations';

// Import Server Configuration
import { config } from '../config';

// Set Express Port
const port = process.env.port || config.port;

// Initialize Express
const app = express();

// Remove Express `X-Powered-By` Header
app.disable('x-powered-by');

// Enable CORS Requests (All)
app.use(cors());

function initServer() {
    Operation.updateAllSources();
    /* app.listen(port, () =>
        console.log(`REST API running on http://localhost:${port}`)
    ); */
}

export default initServer;
