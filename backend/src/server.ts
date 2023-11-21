import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import usuarioRoutes from './routes/usuario';
import cidadeRoutes from './routes/cidades';
import clienteRoutes from './routes/clientes';
import statusRoutes from './routes/status';
import pecasRoutes from './routes/peças';
import ordemRoutes from './routes/OrdemServico';
import ordemServicoPecaRoutes from './routes/ordemServicoPeca';
import permissaoRoutes from './routes/permissao';


let server: Express = express();

let port: number = Number(process.env.SERVER_PORT || 3000);

server.use(cors());
server.use(express.json());
server.use((req: Request, res: Response, next: NextFunction) => {
    console.log('|' + (new Date()) + '|' + req.method + ' ' + req.url);
    next();
});

server.use(usuarioRoutes);
server.use(cidadeRoutes);
server.use(clienteRoutes);
server.use(statusRoutes);
server.use(ordemRoutes);
server.use(pecasRoutes);
server.use(ordemServicoPecaRoutes);
server.use(permissaoRoutes);

export default {
    start() {
        server.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }
}