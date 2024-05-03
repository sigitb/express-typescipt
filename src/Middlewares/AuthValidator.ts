import { Request, Response, NextFunction } from 'express';
import { check,validationResult } from 'express-validator';
const db = require("../db/models");


export const validateRegister = [
    check('name').isString(),
    check('username').notEmpty().withMessage("username tidak boleh kosong").custom(value => {
        const unique = db.user.findOne({ where: { username: value } });
        if (unique) {
          return Promise.reject('Username sudah digunakan');
        }
    }).isLength({min:5}).withMessage("username min 5").isString().withMessage("username harus string"),
    check('password').isLength({ min: 6 }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        }
        return next();
    }

];

export const validateLogin = [
    check('username').notEmpty().withMessage("username tidak boleh kosong"),
    check('password').isLength({ min: 6 }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        }
        return next();
    }

];



