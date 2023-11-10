import { NextFunction, Request, Response, Router } from 'express';
import { Status } from '../models/status';
import { StatusController } from '../controller/StatusController copy';
import * as yup from 'yup';


async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
  let schema = yup.object({
    nome: yup.string().min(3).max(255).required(),
    tipo: yup.string().min(1).max(1).required(),
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

    let status: Status|null = await Status.findOneBy({ id });
    if (! status) {
      return res.status(422).json({ error: 'Status não encontrado!' });
    }

  res.locals.status = status;

    return next();
}


let router: Router = Router();

let statusController: StatusController = new StatusController();

router.get('/status', statusController.list);

router.get('/status/:id',validarPayload, validarSeExiste, statusController.find);

router.post('/status', validarPayload, statusController.create);

router.put('/status/:id', validarPayload, validarSeExiste, statusController.update);

router.delete('/status/:id', validarSeExiste, statusController.delete);

export default router;