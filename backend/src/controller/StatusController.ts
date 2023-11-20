import { Status } from '../models/status';
import { ILike} from 'typeorm';
import { Request, Response } from 'express';

export class StatusController {

    async list (req: Request, res: Response): Promise<Response> {
        let status: Status[] = await Status.find();

        return res.status(200).json(status);
    }


    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
       
        let status: Status = await Status.create({
            nome: body.nome,
            tipo: body.tipo
        }).save();
    
        return res.status(200).json(status);
    }
    async delete (req: Request, res: Response): Promise<Response> {
        let status: Status= res.locals.status;
    
        status.remove();
        
        return res.status(200).json();
    }

    async find (req: Request, res: Response): Promise<Response> {
        let status: Status = res.locals.status;
  
        return res.status(200).json(status);
    }

   
    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let status: Status = res.locals.status;
    
        status.nome = body.nome,
        status.tipo = body.tipo,
        await status.save();
    
        return res.status(200).json(status);
    }
}