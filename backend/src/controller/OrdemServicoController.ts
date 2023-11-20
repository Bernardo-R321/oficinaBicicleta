import { OrdemServico } from '../models/OrdemServico';
import { ILike } from 'typeorm';
import { Request, Response } from 'express';
import { Status } from '../models/status';
import { Usuarios } from '../models/usuario';
import { Clientes } from '../models/clientes';

export class OrdemServicoController {

    async list(req: Request, res: Response): Promise<Response> {
        let OS: OrdemServico[] = await OrdemServico.find();

        return res.status(200).json(OS);
    }


    async create(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let status: Status | null = await Status.findOneBy({ "id": body.id_status })
        if (status === null) {
            return res.status(422).json({ "error": "Status não encontado!" });
        }

        let usuario: Usuarios | null = await Usuarios.findOneBy({ "id": body.id_usuario })
        if (usuario === null) {
            return res.status(422).json({ "error": "Usuário não encontado!" });
        }

        let cliente: Clientes | null = await Clientes.findOneBy({ "id": body.id_cliente })
        if (cliente === null) {
            return res.status(422).json({ "error": "Cliente não encontado!" });
        }

        let OS: OrdemServico = await OrdemServico.create({
            cliente: cliente,
            descricaoserv: body.descricaoserv,
            descricaobike: body.descricaobike,
            valorservico: body.valorservico,
            // id_pecas: body.id_pecas,
            qtdpeca: body.qtdpeca,
            valorpeca: body.valorpeca,
            valorOS: body.valorOS,
            status: status,
            usuario: usuario
        }).save();

        return res.status(200).json(OS);
    }
    async delete(req: Request, res: Response): Promise<Response> {
        let os: OrdemServico | null = await OrdemServico.findOneBy({ "id": Number(req.params.id) })

        await OrdemServico.delete({ id: os?.id });

        return res.status(200).json(os);

    }

    async find(req: Request, res: Response): Promise<Response> {
        let OS: OrdemServico = res.locals.OS;

        return res.status(200).json(OS);
    }


    async update(req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let OS: OrdemServico = res.locals.OS

        if (OS === null) {
            return res.status(422).json({ "error": "Ordem de Serviço não encontrada!" });
        }

        let status: Status | null = await Status.findOneBy({ "id": body.status_id })
        if (status === null) {
            return res.status(422).json({ "error": "Status não encontado!" });
        }

        let usuario: Usuarios | null = await Usuarios.findOneBy({ "id": body.usuario_id })
        if (usuario === null) {
            return res.status(422).json({ "error": "Usuário não encontado!" });
        }

        let cliente: Clientes | null = await Clientes.findOneBy({ "id": body.cliente_id })
        if (cliente === null) {
            return res.status(422).json({ "error": "Cliente não encontado!" });
        }

        OS.descricaoserv = body.descricaoserv;
        OS.descricaobike = body.descricaobike;
        OS.valorservico = body.valorservico;
        // OS.id_pecas = body.id_pecas;
        OS.qtdpeca = body.qtdpeca;
        OS.valorpeca = body.valorpeca;
        OS.valorOS = body.valorOS;
        OS.status = status;
        OS.usuario = usuario;
        OS.cliente = cliente;
        await OS.save();

        return res.status(200).json(OS);
    }
}