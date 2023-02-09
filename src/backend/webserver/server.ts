import express, { Request, Response } from 'express';
import { createPool, PoolConnection } from 'mariadb';
import { createServer } from 'node:http';
import * as dotenv from 'dotenv';
import { handleSupplyOverviewHomeRequest } from './dataRequestHandler/GrocerySupplyOverviewHomeHandler';
// import { handleExpirationDataRequest } from './dataRequestHandler/ExpirationDateRequestHandler';


dotenv.config();

const app = express();
const server = createServer(app);

const dbConnectionPool = createPool({
   host: process.env.DB_HOST,
   port: parseInt(process.env.DB_PORT as string, 10),
   user: process.env.DB_USER,
   password: process.env.DB_PWD,
   database: 'grocery_item_manager',
   connectionLimit: 4
});


async function handleRequest(
   request: Request,
   response: Response,
   handler: (request: Request, dbConnection: PoolConnection) => Promise<any>
): Promise<void> {

   let dbConnection: PoolConnection | undefined;
   try {
      dbConnection = await dbConnectionPool.getConnection();
      const result = await handler(request, dbConnection);
      await dbConnection.release();
      response.json(result);
   } catch (error) {
      await dbConnection?.release();
      console.log(error);
   }

}


app.use('/', express.static('../dist/public'));


app.get('/api/Home/supplyOverview', async (request, response) => {
   await handleRequest(request, response, handleSupplyOverviewHomeRequest);
});


/*
app.get('/api/Home/expirationDateOverview/:dayLimit', (request, response) => {
   response.json(handleExpirationDataRequest(request.params.dayLimit));
});
*/


server.listen(8080);
