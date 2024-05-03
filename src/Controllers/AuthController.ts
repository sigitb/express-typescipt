import { compare } from "bcrypt";
import { Request, response, Response } from "express";
const db = require("../db/models");
import Authentication from "../utils/Authentication";


class AuthController { 
    register = async (req: Request, res: Response): Promise<Response> =>{
        let { name, username, password } = req.body;
        const hashPassword: string = await Authentication.PasswordHash(password);
        const created = await db.user.create({
            name, username, password:hashPassword
        })

        return res.send("regiter successfuly");
    } 
    login = async (req: Request, res: Response):  Promise<Response> =>{
        let { username, password } = req.body;

        // cari data user dari username
        const user = await db.user.findOne({
            where: { username }
        });
        if (!user) {
            return res.send("user not found");
        }
        // check password
        let compare = await Authentication.PasswordCompare(password, user.password);

        // generate token
        if (compare == true) {
            let token = Authentication.generateToken(user.id, username, user.password);

            return res.send({ token });
        }

        return res.send("chek username dan password anda");

    } 

    profile = (req: Request, res: Response): Response => {
        return res.send(req.app.locals.credential);
    }
}

export default new AuthController();