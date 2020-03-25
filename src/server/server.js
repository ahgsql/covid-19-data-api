/**
 * Server Entry Point
 */

// Import Required Modules
import cors from 'cors';
import express from 'express';

// Import Server Operations
import Server from './operations';

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

export default async function init() {
    await Server.updateAllSources();

    app.listen(port, () =>
        console.log(`COVID-19 Data API running on http://localhost:${port}.`)
    );
}
