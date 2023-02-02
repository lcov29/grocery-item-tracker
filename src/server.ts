import express from 'express';
import { createServer } from 'node:http2';


const app = express();
const server = createServer(app);

app.use('/', express.static('../dist/public'));

const port = 8080;
server.listen(port);
