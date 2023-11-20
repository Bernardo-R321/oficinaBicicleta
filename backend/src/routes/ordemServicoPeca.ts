import { NextFunction, Request, Response, Router } from 'express';
import * as yup from 'yup';
import { OrdemServicoPecaController } from '../controller/OrdemServicosPecaController';
import { OrdemServicoPeca } from '../models/ordemServiçoPeca';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
  let schema = yup.object({
    nome: yup.string().min(1).max(255).required(),
  })

  let payload = req.body;

  try{
  let resultado = await schema.validate(payload, { abortEarly: false, stripUnknown: true });
  return next();
  }catch(error){
    if (error){
      if (error instanceof yup.ValidationError){
        return res.status(400).json({errors: error.errors});
      }
      return res.status(500).json({ error: 'Ops! Algo deu errado!'});
    }

  }
}

async function validarSeExiste (req: Request, res: Response, next: NextFunction): Promise<Response|void> {
    let id = Number(req.params.id);

    let ordemServicoPeca: OrdemServicoPeca|null = await OrdemServicoPeca.findOneBy({ id });
    if (! OrdemServicoPeca) {
      return res.status(422).json({ error: 'Pedido não encontrada!' });
    }

  res.locals.ordemServicoPeca = ordemServicoPeca;

    return next();
}


let router: Router = Router();

let ordemServicoPecaController: OrdemServicoPecaController = new OrdemServicoPecaController();

router.get('/ordemServicoPeca', ordemServicoPecaController.list);

router.get('/ordemServicoPeca/:id',validarPayload, validarSeExiste, ordemServicoPecaController.find);

router.post('/ordemServicoPeca', validarPayload, ordemServicoPecaController.create);

router.put('/ordemServicoPeca/:id', validarPayload, validarSeExiste, ordemServicoPecaController.update);

router.delete('/ordemServicoPeca/:id', validarSeExiste, ordemServicoPecaController.delete);

export default router;