import { Router } from 'express';

import { AuthController } from '../controllers/Auth.controller';
import { validateLoginRoute, validateRegisterRoute } from '../middlewares/validation.middleware';

export const authenticationRouter = Router();
const authController = new AuthController();

authenticationRouter.get('/login', (req, res) => {
  if(!req.cookies.jwt) {
    res.render('signIn');
  } else {
    res.redirect('/');
  }
})

authenticationRouter.post('/login', validateLoginRoute, (req, res) => {
  authController.login(req, res);
})

authenticationRouter.get('/register', (req, res) => {
  if(!req.cookies.jwt) {
    res.render('signUp');
  } else {
    res.redirect('/');
  }
})

authenticationRouter.post('/register', validateRegisterRoute, (req, res) => {
  authController.registration(req, res);
})
