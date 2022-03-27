import express, { Express, Request, Response } from 'express';
require('dotenv').config();

const app: Express = express();
const port = process.env.PORT;

app.use(function (req, res, next) {
  res.setHeader('access-control-allow-origin', String(process.env.FRONTEND_ENDPOINT));
  next();
})

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/plus', (req: Request, res: Response) => {
  const result = Number(req.query.a) + Number(req.query.b);
  res.send({
    result
  });
});

app.get('/multiply', (req: Request, res: Response) => {
  const result = Number(req.query.a) * Number(req.query.b);
  res.send({
    result
  });
});

app.get('/divide', (req: Request, res: Response) => {
  const result = Number(req.query.a) / Number(req.query.b);
  res.send({
    result
  });
});

app.get('/validate', (req: Request, res: Response) => {
  const equation = String(req.query.equation);
  const answer = Number(req.query.answer);
  const result = eval(equation) === answer;
  res.send({
    result
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});