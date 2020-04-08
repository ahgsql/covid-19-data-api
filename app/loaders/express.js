import cors from 'cors';
import routes from '../api';
import config from '../config';

function expressLoader(app) {
    // Setup health checkpoints to ensure server is running properly.
    app.get('/status', (req, res) => res.status(200).end());
    app.head('/status', (req, res) => res.status(200).end());

    // Remove Express 'X-Powered-By' Header
    app.disable('x-powered-by');

    // Set up trust proxy to show real IP if server is behind a reverse proxy.
    app.enable('trust proxy');

    // Enable Cross Origin Resource Sharing to all resources by default.
    app.use(cors());

    // Load API Routes
    app.use(config.api.prefix, routes());

    // Catch 404 errors and forward them to the error handler.
    app.use((res, req, next) => {
        const error = new Error('Not Found');

        error['status'] = 404;

        next(error);
    });

    /**
     * Additional Error Handlers
     */
    app.use((error, req, res, next) => {
        res.status(error.status || 500);

        res.json({
            errors: {
                message: error.message,
            },
        });
    });
}

export default expressLoader;
