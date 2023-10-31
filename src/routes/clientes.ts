import { NextFunction, Request, Response, Router } from 'express';
import * as yup from 'yup';
import { Clientes } from '../models/clientes';
import { ClientesController } from '../controller/ClienteController';

async function validarPayload (req: Request, res: Response, next: NextFunction): Promise<Response|void>{
  let schema = yup.object({
    nome: yup.string().min(3).max(255).required(),
    cpf: yup.string().min(3).max(11).required(),
    email: yup.string().min(3).max(255).required(),
    telefone: yup.string().min(3).max(15).required(),
    endereco: yup.string().min(3).max(255).required(),
    id_cidade: yup.number().required(),
    estado: yup.string().min(3).max(255).required(),
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

    let cliente: Clientes|null = await Clientes.findOneBy({ id });
    if (! cliente) {
      return res.status(422).json({ error: 'Cliente não encontrado!' });
    }

  res.locals.cliente = cliente;

 return next();
}


let router: Router = Router();

let clientesController: ClientesController = new ClientesController();

router.get('/clientes', clientesController.list);

router.get('/clientes/:id', validarSeExiste, clientesController.find);

router.post('/clientes', validarPayload, clientesController.create);

router.put('/clientes/:id', validarSeExiste, clientesController.update);

router.delete('/clientes/:id', validarSeExiste, clientesController.delete);

export default router;
