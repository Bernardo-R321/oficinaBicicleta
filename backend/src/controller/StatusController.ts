import { Status } from '../models/status';
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ILike } from "typeorm";
import * as nodemailer from "nodemailer";
import * as puppeteer from "puppeteer";

export class StatusController {

    async list(req: Request, res: Response): Promise<Response> {
        let status: Status[] = await Status.find();

        return res.status(200).json(status);
    }


    async create(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let status: Status = await Status.create({
            nome: body.nome,
            tipo: body.tipo
        }).save();

        return res.status(200).json(status);
    }
    async delete(req: Request, res: Response): Promise<Response> {
        let status: Status = res.locals.status;

        status.remove();

        return res.status(200).json();
    }

    async find(req: Request, res: Response): Promise<Response> {
        let status: Status = res.locals.status;

        return res.status(200).json(status);
    }


    async update(req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let status: Status = res.locals.status;

        status.nome = body.nome,
            status.tipo = body.tipo,
            await status.save();

        return res.status(200).json(status);
    }

    async pdf(req: Request, res: Response) {
        let dados = await Status.find();
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
        <th>Tipo</th>
        </tr>`;
        dados.forEach(function (dado) {
            html += `<tr>
            <td>${dado.id}</td>
            <td>${dado.nome}</td>
            <td>${dado.tipo}</td>
            </tr>`;
        })
        html += `</table>`

        console.log(html);

        let pdf = await StatusController.criarPdf(html);

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

        let status: Status[] = await Status.find()

        let header = '"ID";"Nome";"Tipo"\n';
        let csv = header;

        status.forEach((element) => {
            csv += `"${element.id}";"${element.nome}";"${element.tipo}"\n`;
        });

        res.append("Content-Type", "text/csv");
        res.attachment("usuarios.csv");
        return res.status(200).send(csv);
    }
    
    async sendEmail(req: Request, res: Response): Promise <Response> {
        let body = req.body;
    
        let emailConfig = {
          host: "smtp.office365.com",
          port: 587,
          secure: false,
          tls: {
            rejectUnauthorized: false,
            ciphers: "SSLv3",
          },
          auth: {
            user: process.env.USER,
            pass: process.env.PASS,
          },
        };
    
        if (body.status == "concluida") {
            let mailOptions = {
            from: "francinebronstrup@hotmail.com",
            to: body.email,
            subject: "Oficina Bike",
            html: `Estamos entrando em contato para avisar que o conserto da sua bike está concluido, ${body.nome}. Venha até a loja retirar a sua magrela ;)`,
            };
    
            let transporter = nodemailer.createTransport(emailConfig);
        
            transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                console.log("Erro ao enviar email:" + error);
                return res.status(401).send("Erro ao enviar email" + error);
            } else {
                console.log("Email enviado: " + info.response);
                return res.status(200).send("Email enviado: " + info.response);
            }
            });
        
            return res.status(401);
        }};
}