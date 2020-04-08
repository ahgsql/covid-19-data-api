import Winston from 'winston';
import config from '../config';

const transports = [];

if (process.env.NODE_ENV !== 'development') {
    transports.push(new Winston.transports.Console());
} else {
    transports.push(
        new Winston.transports.Console({
            format: Winston.format.combine(Winston.format.cli(), Winston.format.splat()),
        })
    );
}

const LoggerInstance = Winston.createLogger({
    format: Winston.format.combine(
        Winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        Winston.format.errors({
            stack: true,
        }),
        Winston.format.splat(),
        Winston.format.json()
    ),
    level: config.logs.level,
    levels: Winston.config.npm.levels,
    transports,
});

export default LoggerInstance;
