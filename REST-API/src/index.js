import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import {Constants} from "./constants";
import {Schema} from "./schema";
const rp = require('request-promise');

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// internal middleware
app.use(middleware({ config }));

// api router
app.use('/api', api({ config }));


let reqOpts = {
  method: 'POST',
  uri: Constants.dbUrl + 'query',
  json: true,
};

// Make sure the newest schema is loaded in
reqOpts.body = Schema.schemaQuery;
rp(reqOpts);

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
