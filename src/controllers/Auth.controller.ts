import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { authConfig } from '../config/auth.config';
import { MySQLModel } from '../models/MySQL.model';

export class AuthController {
  private databaseModel: MySQLModel;

  constructor() {
    this.databaseModel = MySQLModel.getInstance();
  }

  public async registration(req, res) {
    const candidate = await this.databaseModel.query(`
    SELECT * FROM Users
    WHERE Email = '${req.body.email}'`);

    if (_.isEmpty(candidate)) {
      const hashPassword = await bcrypt.hash(req.body.password, 7);

      const newUser = await this.databaseModel.run(`
      INSERT INTO Users (Email, Password, Role)
      VALUES ('${req.body.email}', '${hashPassword}', '${req.body.role}');`);

      const { email, role } = req.body;
      AuthController.generateJWTCookie(res, email, role);
    } else {
      res.render('signUp', { errorMesage: 'Account already exists' });
    }
  }

  public async login(req, res) {
    const user = await this.databaseModel.query(`
    SELECT * FROM Users
    WHERE Email = '${req.body.email}'`);

    if (!_.isEmpty(user) && req.body.password && user[0].hasOwnProperty('Password')) {
      const match = await bcrypt.compare(req.body.password, user[0]['Password']);
      if (match) {
        const email = user[0]['Email'];
        const role = user[0]['Role'];
        AuthController.generateJWTCookie(res, email, role);
      } else {
        res.render('signIn', { errorMessage: 'Incorrect password. Try again.'});
      }
    } else {
      res.render('signIn', { errorMessage: 'No account for this email registered.'});
    }
  }

  static generateJWTCookie(res, email, role) {

    const { secret } = authConfig;
    const token = jwt.sign({ email, role }, secret, { expiresIn: '1h' });
    const cookie = {
      expiresIn: '1h',
      httpOnly: true,
    };

    res.cookie('jwt', token, cookie);
    res.redirect('/');
    res.end();
  }
}
