import { Clientes } from '../models/clientes';
import { ILike } from 'typeorm';
import { Request, Response } from 'express';
import puppeteer from 'puppeteer';

export class ClientesController {

    async list(req: Request, res: Response): Promise<Response> {
        let client: Clientes[] = await Clientes.find();

        return res.status(200).json(client);
    }


    async create(req: Request, res: Response): Promise<Response> {
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
    async delete(req: Request, res: Response): Promise<Response> {
        let cliente: Clientes = res.locals.cliente;

        cliente.remove();

        return res.status(200).json();
    }

    async find(req: Request, res: Response): Promise<Response> {
        let cliente: Clientes = res.locals.cliente;

        return res.status(200).json(cliente);
    }


    async update(req: Request, res: Response): Promise<Response> {
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

    async pdf(req: Request, res: Response) {
        let dados = await Clientes.find();
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
    <h1>Lista de clientes</h1>
  <table border="1">`;

        html += `
        <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>CPF</th>
        <th>Email</th>
        <th>Telefone</th>
        <th>Endereço</th>
        <th>Cidade</th>
        </tr>`;
        dados.forEach(function (dado) {
            html += `<tr>
            <td>${dado.id}</td>
            <td>${dado.nome}</td>
            <td>${dado.cpf}</td>
            <td>${dado.email}</td>
            <td>${dado.telefone}</td>
            <td>${dado.endereco}</td>
            <td>${dado.cidade.nome}</td>
            </tr>`;
        })
        html += `</table>`

        console.log(html);

        let pdf = await ClientesController.criarPdf(html);

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

        let clientes: Clientes[] = await Clientes.find()

        let header = '"ID";"Nome";"CPF";"Email";"Telefone";"Endereço";"Cidade"\n';
        let csv = header;

        clientes.forEach((element) => {
            csv += `"${element.id}";"${element.nome}";"${element.cpf}";"${element.email}";"${element.telefone}";"${element.endereco}";"${element.cidade.nome}"\n`;
        });

        res.append("Content-Type", "text/csv");
        res.attachment("usuarios.csv");
        return res.status(200).send(csv);
    }
}