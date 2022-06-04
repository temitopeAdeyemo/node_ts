// import './module.js';
import express from 'express';
import http from 'http';
import chalk from 'chalk';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/logging';
const app = express();
const connectDb = async () => {
    try {
        await mongoose.connect(config.mongo.Url, {
            retryWrites: true,
            w: 'majority'
        });
        Logging.info('Database Connected');
        startServer();
    } catch (error) {
        Logging.error('Database Not Connected');
        Logging.error(error);
    }
};
connectDb();

const startServer = () => {
    app.use((req, res, next) => {
        //logging request
        Logging.info(`Incoming -> Method: [${req.method}] - url: [${req.url}] - Ip: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            //logging the response
            Logging.info(`Incoming -> Method: [${req.method}] - url: [${req.url}] - Ip: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    //Router

    //Base Url
    app.get("/", (req, res, next)=>{
        res.status(201).send("Hiya!!!")
    })

    app.use((req, res, next)=>{
        const error = new Error("Not Found")
        Logging.error(error)
        return res.status(404).json({
            message: error.message
        })
    })
    http.createServer(app).listen(config.server.port, () => {
        Logging.info(`App is running on port ${config.server.port}`);
    });
    // app.listen(config.server.port, ()=>{
    //     Logging.info(`App is running on port ${config.server.port}`)
    // })
};
