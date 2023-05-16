import express, { Request, Response } from 'express';
import { createPool, PoolConnection } from 'mariadb';
import bodyParser from 'body-parser';
import { createServer } from 'node:http';
import * as dotenv from 'dotenv';
import { handleSupplyOverviewRequest } from './dataRequestHandler/GetSupplyOverviewHandler';
import { handleExpirationDateRequest } from './dataRequestHandler/GetExpirationDateRequestHandler';
import { handleCategoryDataRequest } from './dataRequestHandler/GetCategoryRequestHandler';
import { handleMeasurementUnitRequest } from './dataRequestHandler/GetMeasurementUnitRequestHandler';
import { handleNewTopCategoryPostRequest } from './dataRequestHandler/PostNewTopCategoryRequestHandler';
import { handleNewSubCategoryPostRequest } from './dataRequestHandler/PostNewSubCategoryRequestHandler';
import { handleAddNewProductPostRequest } from './dataRequestHandler/PostAddProductDataRequestHandler';
import { handleProductNameListRequest } from './dataRequestHandler/GetProductNameListRequestHandler';
import { handleDistributorNameListRequest } from './dataRequestHandler/GetDistributorNameListRequestHandler';
import { handleNewDistributorPostRequest } from './dataRequestHandler/PostNewDistributorRequestHandler';
import { handleAddItemsToSupplyPostRequest } from './dataRequestHandler/PostAddItemsToSupplyRequestHandler';
import { handleUnconsumedItemIdListRequest } from './dataRequestHandler/GetUnconsumedItemIdListRequestHandler';
import { handleInformationForIdRequest } from './dataRequestHandler/GetItemInformationForId';
import { handleConsumeItemsPostRequest } from './dataRequestHandler/PostConsumeItemsRequestHandler';
import { handleSupplyProductNameListRequest } from './dataRequestHandler/GetSupplyProductNameListRequestHandler';
import { handleProductSupplyRequest } from './dataRequestHandler/GetProductSupplyRequestHandler';


dotenv.config();

const app = express();
const server = createServer(app);


const dbConnectionPool = createPool(
   {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as string, 10),
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: 'grocery_item_manager',
      connectionLimit: 4
   }
);


type HandleRequestParam = {
   request: Request,
   response: Response,
   handler: (
      request: Request,
      dbConnection: PoolConnection,
      argumentList: string[]
   ) => Promise<any>,
   argumentList: string[]
};


async function handleRequest(param: HandleRequestParam): Promise<void> {
   const { request, response, handler, argumentList } = param;

   let dbConnection: PoolConnection | undefined;
   try {
      dbConnection = await dbConnectionPool.getConnection();
      const result = await handler(request, dbConnection, argumentList);
      response.json(result);
      await dbConnection.release();
   } catch (error) {
      await dbConnection?.release();
   }
}


app.use('/', express.static('../dist/public'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/api/supplyOverview', async (request, response) => {
   const param = {
      request,
      response,
      handler: handleSupplyOverviewRequest,
      argumentList: [] as string[]
   };
   await handleRequest(param);
});


app.get('/api/home/expirationDateOverview/:dayLimit', async (request, response) => {
   const param = {
      request,
      response,
      handler: handleExpirationDateRequest,
      argumentList: [request.params.dayLimit]
   };
   await handleRequest(param);
});


app.get('/api/grocerySupplyOverview/productList', async (request, response) => {
   const param = {
      request,
      response,
      handler: handleSupplyProductNameListRequest,
      argumentList: [] as string[]
   };
   await handleRequest(param);
});


app.get('/api/grocerySupplyOverview/productData/:productId', async (request, response) => {
   const param = {
      request,
      response,
      handler: handleProductSupplyRequest,
      argumentList: [request.params.productId]
   };
   await handleRequest(param);
});


app.get('/api/groceryItemAdd/categoryData', async (request, response) => {
   const param = {
      request,
      response,
      handler: handleCategoryDataRequest,
      argumentList: [] as string[]
   };
   await handleRequest(param);
});


app.get('/api/groceryItemAdd/measurementUnitData', async (request, response) => {
   const param = {
      request,
      response,
      handler: handleMeasurementUnitRequest,
      argumentList: [] as string[]
   };
   await handleRequest(param);
});


app.get('/api/groceryItemAdd/productNameList', async (request, response) => {
   const param = {
      request,
      response,
      handler: handleProductNameListRequest,
      argumentList: [] as string[]
   };
   await handleRequest(param);
});


app.get('/api/groceryItemAdd/distributorNameList', async (request, response) => {
   const param = {
      request,
      response,
      handler: handleDistributorNameListRequest,
      argumentList: [] as string[]
   };
   await handleRequest(param);
});


app.get('/api/groceryItemConsume/unconsumedItemIdList', async (request, response) => {
   const param = {
      request,
      response,
      handler: handleUnconsumedItemIdListRequest,
      argumentList: [] as string[]
   };
   await handleRequest(param);
});


app.get('/api/groceryItemConsume/itemInformationForId/:id', async (request, response) => {
   const param = {
      request,
      response,
      handler: handleInformationForIdRequest,
      argumentList: [request.params.id]
   };
   await handleRequest(param);
});


app.post('/api/groceryItemAdd/addTopCategoryData', async (request, response) => {
   const param = {
      request,
      response,
      handler: handleNewTopCategoryPostRequest,
      argumentList: [] as string[]
   };
   await handleRequest(param);
});


app.post('/api/groceryItemAdd/addSubCategoryData', async (request, response) => {
   const param = {
      request,
      response,
      handler: handleNewSubCategoryPostRequest,
      argumentList: [] as string[]
   };
   await handleRequest(param);
});


app.post('/api/groceryItemAdd/addNewProduct', async (request, response) => {
   const param = {
      request,
      response,
      handler: handleAddNewProductPostRequest,
      argumentList: [] as string[]
   };
   await handleRequest(param);
});


app.post('/api/groceryItemAdd/addNewDistributor', async (request, response) => {
   const param = {
      request,
      response,
      handler: handleNewDistributorPostRequest,
      argumentList: [] as string[]
   };
   await handleRequest(param);
});


app.post('/api/groceryItemAdd/addItemsToSupply', async (request, response) => {
   const param = {
      request,
      response,
      handler: handleAddItemsToSupplyPostRequest,
      argumentList: [] as string[]
   };
   await handleRequest(param);
});


app.post('/api/groceryItemConsume/consumeItems', async (request, response) => {
   const param = {
      request,
      response,
      handler: handleConsumeItemsPostRequest,
      argumentList: [] as string[]
   };
   await handleRequest(param);
});


server.listen(8080);
