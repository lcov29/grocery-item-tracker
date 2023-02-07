import express from 'express';
import { createServer } from 'node:http';
import { homeSupplyOverviewData } from './demoData';
import { handleExpirationDataRequest } from './dataRequestHandler/ExpirationDateRequestHandler';


const app = express();
const server = createServer(app);

app.use('/', express.static('../dist/public'));

app.use('/api/Home/supplyOverview', (request, response) => {
   response.json(homeSupplyOverviewData);
});

app.use('/api/Home/expirationDateOverview/:dayLimit', (request, response) => {
   response.json(handleExpirationDataRequest(parseInt(request.params.dayLimit, 10)));
});

const port = 8080;
server.listen(port);
