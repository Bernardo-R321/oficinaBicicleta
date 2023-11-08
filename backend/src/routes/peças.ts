import { NextFunction, Request, Response, Router } from 'express';
import { PeçasController } from '../controller/PeçasController'; 
import * as yup from 'yup';
import { Peças } from '../models/Peças';
import { Not } from 'typeorm';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
  let schema = yup.object({
    id: yup.string().min(1).max(255).required(),
    descrição: yup.string().min(1).max(255).required(),
    valor: yup.number().min(1).max(255).required(),
    nomePeças: yup.string().min(1).max(255).required()
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

    let peças: Peças|null = await Peças.findOneBy({ id: id ? Not(id) : undefined });
    if (! peças) {
      return res.status(422).json({ error: 'ID não encontrada!' });
    }

  res.locals.peças = peças;

    return next();
}


let router: Router = Router();

let peçasController: PeçasController = new PeçasController();

router.get('/peças', PeçasController.list);

router.get('/peças/:id', validarSeExiste, peçasController.find);

router.post('/peças', validarPayload, peçasController.create);

router.put('/peças/:id', validarSeExiste, peçasController.update);

router.delete('/peças/:id', validarSeExiste, peçasController.delete);

export default router;
