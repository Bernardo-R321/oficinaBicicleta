import { NextFunction, Request, Response, Router } from 'express';
import * as yup from 'yup';
import { OrdemServico } from '../models/OrdemServico';
import { OrdemServicoController } from '../controller/OrdemServicoController copy';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
  let schema = yup.object({
    id_cliente: yup.number().required(),
    descricaoserv: yup.string().min(3).max(255).required(),
    descricaobike: yup.string().min(3).max(255).required(),
    valorservico: yup.number().required(),
    id_peca: yup.number().required(),
    qtdpeca: yup.number().required(),
    valorpeca: yup.number().required(),
    valorOS: yup.number().required(),
    id_status: yup.number().required(),
    id_usuario: yup.number().required(),
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

    let OS: OrdemServico|null = await OrdemServico.findOneBy({ id });
    if (! OS) {
      return res.status(422).json({ error: 'OS não encontrada!' });
    }

  res.locals.OS = OS;

 return next();
}


let router: Router = Router();

let OSController: OrdemServicoController = new OrdemServicoController();

router.get('/ordemserviço', OSController.list);

router.get('/ordemserviço/:id', validarSeExiste, OSController.find);

router.post('/ordemserviço', validarPayload, OSController.create);

router.put('/ordemserviço/:id',validarPayload, validarSeExiste, OSController.update);

router.delete('/ordemserviço/:id', validarSeExiste, OSController.delete);

export default router;
