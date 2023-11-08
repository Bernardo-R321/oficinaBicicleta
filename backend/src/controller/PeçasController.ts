import { ILike } from "typeorm";
import { Peças } from "../models/Peças";
import { Request, Response } from "express";


export class PeçasController{
  static find(arg0: string, validarSeExiste: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => Promise<void | Response<any, Record<string, any>>>, find: any) {
    throw new Error('Method not implemented.');
  }
  static list(arg0: string, list: any) {
    throw new Error('Method not implemented.');
  }

    async list (req: Request, res: Response): Promise<Response> {
        let id = req.query.id;
    
        let users: Peças[] = await Peças.findBy({
            id: id ? ILike(`%${id}%`) : undefined
          });

          return res.status(200).json(users);
}


    async find (req: Request, res: Response): Promise<Response> {
        let peças: Peças = res.locals.usuario;

        return res.status(200).json(peças);
}

    
    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let usuario: Peças = await Peças.create({
        id: body.id,
        nomePeça: body.nomePeça,
        descrição: body.descrição,
        valor: body.valor

        }).save();

        return res.status(200).json(usuario);
  }


        async update (req: Request, res: Response): Promise<Response> {
            let body = req.body;
            let peças: Peças = res.locals.usuario;

            peças.id = body.id,
            peças.nomePeça = body.nomePeça,
            peças.descrição = body.descrição;
            peças.valor = body.valor;
            await peças.save();

            return res.status(200).json(peças);
        }

        async delete (req: Request, res: Response): Promise<Response> {
            let peças: Peças = res.locals.usuario;
        
            peças.remove();
            
            return res.status(200).json();
        
            }


}