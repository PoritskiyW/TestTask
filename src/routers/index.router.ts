import jwt from 'jsonwebtoken';

import { authConfig } from '../config/auth.config';
import { Router } from 'express';
import { roles } from '../enums/roles.enum';

export const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  if (req.cookies.jwt) {
    try {
      const role = jwt.verify(req.cookies.jwt, authConfig.secret).role;
      const accessLevel = roles[role];
      res.render('main', { accessLevel: accessLevel });
    } catch (err) {
      res.clearCookie('jwt');
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
})
