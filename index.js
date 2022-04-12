"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const cron = require('node-cron');
const { Client } = require('@opensearch-project/opensearch');
const { createAWSConnection, awsGetCredentials } = require('aws-opensearch-connection');
async function main() {
    // get aws credential from ~/.aws/credentials
    const awsCredentials = await awsGetCredentials({ profile: 'elasticsearch' });
    const AWSConnection = createAWSConnection(awsCredentials);
    const esClient = new Client(Object.assign(Object.assign({}, AWSConnection), { node: 'https://search-final-590-pxntcj2ecahcstvuwuhuoilinm.us-east-1.es.amazonaws.com' }));
    const app = (0, express_1.default)();
    const port = process.env.PORT;
    // send heartbeat per 10 seconds
    cron.schedule('*/10 * * * * *', async () => {
        const log = {
            api: 'heartbeat',
            alive: true,
            timestamp: Date()
        };
        await esClient.index({
            index: 'heartbeat',
            body: log
        });
        console.log(log);
    });
    app.use(function (req, res, next) {
        res.setHeader('access-control-allow-origin', String(process.env.FRONTEND_ENDPOINT));
        next();
    });
    app.get('/', (req, res) => {
        res.send('Express + TypeScript Server');
    });
    app.get('/plus', async (req, res) => {
        const result = Number(req.query.a) + Number(req.query.b);
        const log = {
            api: 'plus',
            request: `${req.query.a} + ${req.query.b}`,
            result: result,
            timestamp: Date()
        };
        res.send({
            result
        });
        await esClient.index({
            index: 'api-log',
            body: log
        });
        console.log(log);
    });
    app.get('/multiply', async (req, res) => {
        const result = Number(req.query.a) * Number(req.query.b);
        const log = {
            api: 'multiply',
            request: `${req.query.a} * ${req.query.b}`,
            result: result,
            timestamp: Date()
        };
        res.send({
            result
        });
        await esClient.index({
            index: 'api-log',
            body: log
        });
        console.log(log);
    });
    app.get('/divide', async (req, res) => {
        const result = Number(req.query.a) / Number(req.query.b);
        const log = {
            api: 'divide',
            request: `${req.query.a} / ${req.query.b}`,
            result: result,
            timestamp: Date()
        };
        res.send({
            result
        });
        await esClient.index({
            index: 'api-log',
            body: log
        });
        console.log(log);
    });
    app.get('/validate', async (req, res) => {
        const equation = String(req.query.equation);
        const answer = Number(req.query.answer);
        const result = eval(equation) === answer;
        const log = {
            api: 'validate',
            request: `${req.query.equation} = ${req.query.answer}`,
            result: result ? 1 : 0,
            timestamp: Date()
        };
        res.send({
            result
        });
        await esClient.index({
            index: 'api-log',
            body: log
        });
        console.log(log);
    });
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
}
main();
