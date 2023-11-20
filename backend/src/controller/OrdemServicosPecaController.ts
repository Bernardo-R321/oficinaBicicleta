
import { ILike} from 'typeorm';
import { Request, Response } from 'express';
import { OrdemServicoPeca } from '../models/ordemServiçoPeca';
import ordemServicoPeca from '../routes/ordemServicoPeca';

export class OrdemServicoPecaController {

    async list (req: Request, res: Response): Promise<Response> {
        let ordem: OrdemServicoPeca[] = await OrdemServicoPeca.find();

        return res.status(200).json(ordem);
    }


    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
       
        let ordemServico: OrdemServicoPeca = await OrdemServicoPeca.create({
            nome: body.nome,
        }).save();
    
        return res.status(200).json(ordemServicoPeca);
    }
    async delete (req: Request, res: Response): Promise<Response> {
        let ordemServicoPeca: OrdemServicoPeca= res.locals.ordemServico;
    
        ordemServicoPeca.remove();
        
        return res.status(200).json();
    }

    async find (req: Request, res: Response): Promise<Response> {
        let ordemServicoPeca: OrdemServicoPeca = res.locals.ordemServicoPeca;
  
        return res.status(200).json(ordemServicoPeca);
    }

   
    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let ordemServicoPeca: OrdemServicoPeca = res.locals.ordemServicoPeca;
    
        ordemServicoPeca.nome = body.nome,
        await ordemServicoPeca.save();
    
        return res.status(200).json(ordemServicoPeca);
    }
}