import { NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
export class ApiTokenCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        //console.log(decoded);
        if (decoded) next();
        else {
          //res.status(401);
          res.status(498).send('you are not authorized.');
        }
      } catch (e) {
        res.status(498).send(e.message);
        //throw new Error(e.message);
      }
    } else if (!token) {
      res.status(401).send("Token not found")
      
    }
    console.log('full middleware worked................');
  }
}
