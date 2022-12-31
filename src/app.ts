import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { config } from './config/db.config';

const app: Application = express();
//MongoDb Db SetUp goes Here
mongoose
.connect(config.mongo.url, 
  { retryWrites: true, w: 'majority' })
  .then(() => console.log("Database is connected")).catch((error) => console.log(error));

//Express test response
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    return res.send('Happy coding');
});

//Not Found Routes
app.get('*', (req: Request, res: Response, next: NextFunction) => {
    return res.send('Route not found');
});
//Express App Usage
app.use(express.json());
mongoose.set('strictQuery', true);
//All Routes goes here

// All Protected Routes goes Here
app.listen(config.server.port, () => console.log(`Server running is on ${config.server.port}`));
