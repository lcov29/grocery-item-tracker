import express from 'express';
import { createServer } from 'node:http';
import { homeSupplyOverviewData } from './demoData';


const app = express();
const server = createServer(app);

app.use('/', express.static('../dist/public'));

app.use('/Home/data/supplyOverview', (request, response) => {
   response.json(homeSupplyOverviewData);
});

app.use('/Home/data/expirationDateOverview/:dayLimit', (request, response) => {
   response.json({ response: `Server: Expiration Date Overview (Limit: ${request.params.dayLimit})` });
});

const port = 8080;
server.listen(port);
