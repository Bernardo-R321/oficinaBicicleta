import express, { Express, NextFunction, Request, Response } from 'express';
let server: Express = express();
import cors from 'cors';
import cidadeRoutes from './routes/cidades';
import clienteRoutes from './routes/clientes';


let port: number = Number(process.env.SERVER_PORT || 3000);

server.use(cors());
server.use(express.json());
server.use((req: Request, res: Response, next: NextFunction) => {
    console.log('|' + (new Date()) + '|' + req.method + ' ' + req.url);
    next();
});

server.use(cidadeRoutes);
server.use(clienteRoutes);

export default {
    start() {
        server.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }
}