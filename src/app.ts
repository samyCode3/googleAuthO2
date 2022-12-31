import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { config } from './config/db.config';
import Logging from './library/logger';
const app: Application = express();
//MongoDb Db SetUp goes Here
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then((result) => {
        if (result) {
            setTimeout(() => {
                Logging.info('Database is connected');
                StartServer();
            }, 1000);
        }
    })
    .catch((error) => Logging.error(`Unable to connect because of:  ${error.message}`));

mongoose.set('strictQuery', true);
//Only start the server if the database is connected

const StartServer = () => {
    app.use((req, res, next) => {
        Logging.info(`Incoming -> Method : [${req.method}] - Url : [${req.url}] - IP: [ ${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            Logging.info(`Incoming -> Method : [${req.method}] - Url : [${req.url}]
       - IP: [ ${req.socket.remoteAddress}] - Status : [${res.statusCode}]`);
        });
        next();
    });
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Rules of APIS
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        }
        next();
    });
    app.get('/', (req: Request, res: Response, next: NextFunction) => {
        return res.send('Happy coding');
    });

    //Not Found Routes
    app.get('*', (req: Request, res: Response, next: NextFunction) => {
        const error = new Error('Route Not found');
        Logging.error(error);
        return res.status(404).json({ ok: false, message: error.message });
    });
    app.listen(config.server.port, () => Logging.DatabaseConnect(`Server running is on ${config.server.port}`));
};
// All Protected Routes goes Here
