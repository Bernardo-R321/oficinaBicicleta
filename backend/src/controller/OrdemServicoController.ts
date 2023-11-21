import { OrdemServico } from '../models/OrdemServico';
import { ILike } from 'typeorm';
import { Request, Response } from 'express';
import { Status } from '../models/status';
import { Usuarios } from '../models/usuario';
import { Clientes } from '../models/clientes';
import puppeteer from 'puppeteer';

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

    async pdf(req: Request, res: Response) {
        let dados = await OrdemServico.find();
        console.log(dados);

        let html: string = `<style>
    *{
      font-family: "Arial";
    }
    table{
      width:100%;
      text-align: left;
      border-collapse: collapse;
      margin-bottom: 10px;
    }
    table td{
      padding: 10px
    }
    table th{
      padding: 10px
    }
    </style>
    <h1>Lista de ordens de serviço</h1>
  <table border="1">`;

        html += `
        <tr>
        <th>ID</th>
        <th>Descrição serviço</th>
        <th>Descrição bicicleta</th>
        <th>Valor do serviço</th>
        <th>Valor das peças</th>
        <th>Quantidade de peças</th>
        <th>Valor total</th>
        <th>Status</th>
        <th>Responsável</th>
        <th>Cliente</th>
        </tr>`;
        dados.forEach(function (dado) {
            html += `<tr>
            <td>${dado.id}</td>
            <td>${dado.descricaoserv}</td>
            <td>${dado.descricaobike}</td>
            <td>${dado.valorservico}</td>
            <td>${dado.valorpeca}</td>
            <td>${dado.qtdpeca}</td>
            <td>${dado.valorOS}</td>
            <td>${dado.status.nome}</td>
            <td>${dado.usuario.nome}</td>
            <td>${dado.cliente.nome}</td>



            </tr>`;
        })
        html += `</table>`

        console.log(html);

        let pdf = await OrdemServicoController.criarPdf(html);

        res.append('Content-Type', 'application/x-pdf');
        res.append('Content-Disposition', 'attachment; filename="cidades.pdf"');
        res.send(pdf);

    }

    static async criarPdf(html: string) {

        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 768 });
        await page.setContent(html);
        const pdfBuffer = await page.pdf();
        await page.close();
        await browser.close();
        return pdfBuffer;

    }

    async listCsv(req: Request, res: Response): Promise<Response> {

        let ordens: OrdemServico[] = await OrdemServico.find()

        let header = '"ID";"Descrição serviço";"Descrição bicicleta";"Valor do serviço";"Valor das peças";"Quantidade de peças";"Valor total";"Status";"Responsável";"Cliente"\n';
        let csv = header;

        ordens.forEach((element) => {
            csv += `"${element.id}";"${element.descricaoserv}";"${element.descricaobike}";"${element.valorservico}";"${element.valorpeca}";"${element.qtdpeca}";"${element.valorOS}";"${element.status.nome}";"${element.usuario.nome}";"${element.cliente.nome}"\n`;
        });

        res.append("Content-Type", "text/csv");
        res.attachment("usuarios.csv");
        return res.status(200).send(csv);
    }
}