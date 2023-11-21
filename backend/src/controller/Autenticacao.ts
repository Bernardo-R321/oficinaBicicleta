import { Request, Response } from "express";
import { Usuarios } from "../models/usuario";
import bcrypt from "bcrypt";

export class AutenticacaoController {
  async login(req: Request, res: Response): Promise<Response> {
    let email = req.body.email;
    let senha = req.body.senha;

    let usuario: Usuarios | null = await Usuarios.findOne({
      where: {
        email: email,
      },
      select: ["id", "email", "senha", "nome"],
    });
    if (!usuario) {
      return res.status(401).json({ mensagem: "Usuário ou senha inválida" });
    }
    let resultado = await bcrypt.compare(senha, usuario.senha);

    if (!resultado) {
      return res.status(401).json({ mensagem: "Usuário ou senha inválida" });
    }

    let token: string = Buffer.from(`${email}:${senha}`).toString("base64");

    return res.status(200).json({
      token,
      type: "Basic",
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    });
  }
}