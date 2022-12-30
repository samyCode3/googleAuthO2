import express, {Application, Request, Response, NextFunction} from 'express'
import './config/envConfig'
const app:Application = express()
const PORT = process.env.PORT
//MongoDb Db SetUp goes Here
app.get('/', (req: Request, res: Response, next:NextFunction) => {
  return res.json('Happy coding')
})
//Express App Usage
app.use(express.json())
//All Routes goes here

// All Protected Routes goes Here
app.listen(PORT, () => console.log(`Server running is on ${PORT}`))