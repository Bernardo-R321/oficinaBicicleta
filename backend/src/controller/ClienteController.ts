import { Clientes } from '../models/clientes';
import { ILike} from 'typeorm';
import { Request, Response } from 'express';

export class ClientesController {

    async list (req: Request, res: Response): Promise<Response> {
        let client: Clientes[] = await Clientes.find();

        return res.status(200).json(client);
    }


    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;
       
        let cliente: Clientes = await Clientes.create({
            nome: body.nome,
            cpf: body.cpf,
            email: body.email,
            telefone: body.telefone,
            endereco: body.endereco,
            id_cidade: body.id_cidade,
        }).save();
    
        return res.status(200).json(cliente);
    }
    async delete (req: Request, res: Response): Promise<Response> {
        let cliente: Clientes= res.locals.cliente;
    
        cliente.remove();
        
        return res.status(200).json();
    }

    async find (req: Request, res: Response): Promise<Response> {
        let Cliente: Clientes = res.locals.Cliente;
  
        return res.status(200).json(Cliente);
    }

   
    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let cliente: Clientes = res.locals.cliente;
    
        cliente.nome = body.nome,
        cliente.cpf = body.cpf,
        cliente.email = body.email,
        cliente.telefone = body.telefone,
        cliente.endereco = body.endereco,
        cliente.id_cidade = body.id_cidade,
        await cliente.save();
    
        return res.status(200).json(cliente);
    }
}