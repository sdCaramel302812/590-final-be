"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(function (req, res, next) {
    res.setHeader('access-control-allow-origin', String(process.env.FRONTEND_ENDPOINT));
    next();
});
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/plus', (req, res) => {
    const result = Number(req.query.a) + Number(req.query.b);
    res.send({
        result
    });
});
app.get('/multiply', (req, res) => {
    const result = Number(req.query.a) * Number(req.query.b);
    res.send({
        result
    });
});
app.get('/divide', (req, res) => {
    const result = Number(req.query.a) / Number(req.query.b);
    res.send({
        result
    });
});
app.get('/validate', (req, res) => {
    const equation = String(req.query.equation);
    const answer = Number(req.query.answer);
    console.log(equation);
    console.log(answer);
    const result = eval(equation) === answer;
    res.send({
        result
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
