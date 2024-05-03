import { Request, Response } from "express";
import IController from "./ControllerInterface";


let data: any[] = [
    {id:1, nama:"adi"},
    {id:2, nama:"puput"},
    {id:3, nama:"noe"},
    {id:4, nama:"soki"}
]

class UserController implements IController{
    index(req: Request, res: Response): Response {
        return res.send(data);
    }
    create(req: Request, res: Response): Response {
        const { id, name } = req.body;
        data.push({ id, name });
        return res.send("create success");
    }
    show(req: Request, res: Response): Response {
        const { id } = req.params;
        let person = data.find(item => item.id == id);
        return res.send(person);
    }
    update(req: Request, res: Response): Response {
        const { id } = req.params;
        const { name } = req.body;

        let person = data.find(item => item.id == id);
        person.nama = name;
        return res.send("update success");
    }
    delete(req: Request, res: Response): Response {
        const { id } = req.params;

        let pople = data.filter(item => item.id != id)

        return res.send(pople);
        
    }
    
}

export default new UserController;