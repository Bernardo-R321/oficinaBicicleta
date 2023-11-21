import { Response, Request } from "express";
import { Cidades } from "../models/cidades";
import { Clientes } from "../models/clientes";
import { OrdemServico } from "../models/OrdemServico";
import { OrdemServicoPeca } from "../models/ordemServiçoPeca";
import { Pecas } from "../models/Peças";
import { Permissao } from "../models/permissao";
import { Status } from "../models/status";
import { Usuarios } from "../models/usuario";

export class PermissaoController {
  async list(req: Request, res: Response): Promise<Response> {
    let idUsuario: number = parseInt(req.query.idUsuario + "");
    console.log(idUsuario);

    let permissoes: Permissao[] = await Permissao.findBy({
      idUsuario: idUsuario ? idUsuario : undefined,
    });
    return res.status(200).json(permissoes);
  }

  async create (req: Request, res: Response): Promise<Response> {
    let body = req.body;
   
    let permissao: Permissao = await Permissao.create({
        idUsuario: body.idUsuario,
        idCidade: body.idCidade,
        idCliente: body.idCliente,
        idOrdemServico: body.OrdemServico,
        idOrdemServicoPeca: body.OrdemServicoPeca,
        idPecas: body.Pecas,
        idStatus: body.Status,
    }).save();

    return res.status(200).json(permissao);
}

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);

    let permissao: Permissao | null = await Permissao.findOneBy({
      id: id,
    });
    if (permissao) {
      permissao.idUsuario = body.idUsuario;
      permissao.idCidade = body.idCidade;
      permissao.idCliente = body.idCliente;
      permissao.idOrdemServico = body.idOrdemServico;
      permissao.idOrdemServicoPeca = body.idOrdemServicoPeca;
      permissao.idPecas = body.idPecas;
      permissao.idStatus = body.idStatus;
      await permissao.save();
      return res.status(200).json(permissao);
    } else return res.status(401).json({ message: "Permissão não encontrada" });
  }
  async delete(req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let permissao: Permissao | null = await Permissao.findOneBy({ id });
    if (!permissao) {
      return res.status(422).json({ error: "Página não encontrado! " });
    }

    await permissao.remove();

    return res.status(200).json();
  }
}