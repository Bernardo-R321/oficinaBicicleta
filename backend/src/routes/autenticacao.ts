import { NextFunction, Request, Response, Router } from 'express';
import { AutenticacaoController } from '../controller/Autenticacao';

let router: Router = Router();

let autenticacaoController: AutenticacaoController = new AutenticacaoController();

router.post('/login', autenticacaoController.login)

export default router