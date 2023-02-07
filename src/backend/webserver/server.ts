import express from 'express';
import { createServer } from 'node:http';
import { homeSupplyOverviewData } from './demoData';
import { handleExpirationDataRequest } from './dataRequestHandler/ExpirationDateRequestHandler';


const app = express();
const server = createServer(app);


app.use('/', express.static('../dist/public'));


app.get('/api/Home/supplyOverview', (request, response) => {
   response.json(homeSupplyOverviewData);
});


app.get('/api/Home/expirationDateOverview/:dayLimit', (request, response) => {
   response.json(handleExpirationDataRequest(request.params.dayLimit));
});


const port = 8080;
server.listen(port);
