import { Usuarios } from '../models/usuario';
import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import { ILike } from "typeorm";
// let md5 = require('md5');

export class UsuariosControllers {

    async list(req: Request, res: Response): Promise<Response> {
        let users: Usuarios[] = await Usuarios.find();

        return res.status(200).json(users);
    }

    async find(req: Request, res: Response): Promise<Response> {
        let usuario: Usuarios = res.locals.usuario;

        return res.status(200).json(usuario);
    }


    async create(req: Request, res: Response): Promise<Response> {
        let body = req.body;
        console.log(body)

        let usuario: Usuarios = await Usuarios.create({
            nome: body.nome,
            email: body.email,
            senha: body.senha,
        }).save();

        return res.status(200).json(usuario);
    }

    async update(req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let usuario: Usuarios = res.locals.usuario;

        usuario.nome = body.nome,
            usuario.email = body.email,
            usuario.senha = body.senha,
            await usuario.save();

        return res.status(200).json(usuario);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        let usuario: Usuarios = res.locals.usuario;

        usuario.remove();

        return res.status(200).json();
    }

    async login(req: Request, res: Response): Promise<Response> {
        let body = req.body;
        // let senha = md5(body.senha);
        let usuarioLogin = await Usuarios.findOneBy({ email: body.email, senha: body.senha });

        if (usuarioLogin) {
            return res.status(200).json();
        }

        return res.status(422).json({
            mensagem: "Usuário ou senha incorretos"
        });
    }

    async pdf(req: Request, res: Response) {
        let dados = await Usuarios.find();
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
    <h1>Lista de usuários</h1>
  <table border="1">`;

        html += `
        <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Email</th>
        </tr>`;
        dados.forEach(function (dado) {
            html += `<tr>
            <td>${dado.id}</td>
            <td>${dado.nome}</td>
            <td>${dado.email}</td>
            </tr>`;
        })
        html += `</table>`

        console.log(html);

        let pdf = await UsuariosControllers.criarPdf(html);

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

        let usuarios: Usuarios[] = await Usuarios.find()

        let header = '"ID";"Nome";"Email"\n';
        let csv = header;

        usuarios.forEach((element) => {
            csv += `"${element.id}";"${element.nome}";"${element.email}"\n`;
        });

        res.append("Content-Type", "text/csv");
        res.attachment("usuarios.csv");
        return res.status(200).send(csv);
    }
}