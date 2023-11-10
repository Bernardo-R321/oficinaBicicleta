import { OrdemServico } from '../models/OrdemServico';
import { ILike} from 'typeorm';
import { Request, Response } from 'express';

export class OrdemServicoController {

    async list (req: Request, res: Response): Promise<Response> {
        let OS: OrdemServico[] = await OrdemServico.find();

        return res.status(200).json(OS);
    }


    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
       
        let OS: OrdemServico = await OrdemServico.create({
            id_cliente: body.id_cliente,
            descricaoserv: body.descricaoserv,
            descricaobike: body.descricaobike,
            valorservico: body.valorservico,
            id_pecas: body.id_pecas,
            qtdpeca: body.qtdpeca,
            valorpeca: body.valorpeca,
            valorOS: body.valorOS,
            id_status: body.id_status,
            id_usuario: body.id_usuario,
        }).save();
    
        return res.status(200).json(OS);
    }
    async delete (req: Request, res: Response): Promise<Response> {
        let OS: OrdemServico= res.locals.OS;
    
        OS.remove();
        
        return res.status(200).json();
    }

    async find (req: Request, res: Response): Promise<Response> {
        let OS: OrdemServico = res.locals.OS;
  
        return res.status(200).json(OS);
    }

   
    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let OS: OrdemServico = res.locals.OS;
    
        OS.id_cliente= body.id_cliente,
        OS.descricaoserv= body.descricaoserv,
        OS.descricaobike= body.descricaobike,
        OS.valorservico= body.valorservico,
        OS.id_pecas= body.id_pecas,
        OS.qtdpeca= body.qtdpeca,
        OS.valorpeca= body.valorpeca,
        OS.valorOS= body.valorOS,
        OS.id_status= body.id_status,
        OS.id_usuario= body.id_usuario,
        await OS.save();
    
        return res.status(200).json(OS);
    }
}