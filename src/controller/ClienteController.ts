/*import { Request, Response } from 'express';
import { ILike } from "typeorm";
import { Cidades } from '../models/cidades';
import { Clientes } from '../models/clientes';


export class ClienteController {

    async list (req: Request, res: Response): Promise<Response> {
                      
        let cliente: Clientes[] = await Clientes.find();
       
        return res.status(200).json();
    }

    async find (req: Request, res: Response): Promise<Response> {
      let cliente: Clientes = res.locals.cliente;

      return res.status(200).json(cliente);
    }

    async create (req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let cliente = await Clientes.findOneBy({ id: body.id_cidade}) as Clientes;

        if (!cliente) {
            return res.status(422).json({
                message: "Cidade não existe"
            });
        }
        
        let cliente: Clientes = await Clientes.create({
            nome: body.nome,
            cpf: body.cpf,
            email: body.email,
            telefone: body.telefone,
            endereco: body.endereco,
            cidade: body.cidade,
            estado: body.estado,
        }).save();
    
        return res.status(200).json(cliente);
    }

    async update (req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let cliente: Clientes = res.locals.cliente;

        let cidade = await Cidades.findOneBy({ id: body.id_cidade});

        if (!cidade) {
            return res.status(422).json({
                message: "Cidade não existe"
            });
        }

        cliente.nome = body.nome;
        cliente.cpf = body.cpf;
        cliente.email = body.email;
        cliente.telefone = body.telefone;
        cliente.endereco = body.endereco;
        cliente.cidade = body.cidade;
        cliente.estado = body.estado;
        await cliente.save();
    
        return res.status(200).json(cliente);
    } 

    async delete (req: Request, res: Response): Promise<Response> {
    let cliente: Clientes = res.locals.cliente;

    cliente.remove();
    
    return res.status(200).json();

    }
    
}*/