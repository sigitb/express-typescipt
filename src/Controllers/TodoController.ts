import { Request, Response } from "express";
import IController from "./ControllerInterface";
import TodoService from "../services/TodoService";

class TodoController implements IController{
    index = async(req: Request, res: Response): Promise<Response> =>{
        const service: TodoService = new TodoService(req);
        const todos = await service.getAll();

        return res.send({
            data: todos,
            message: "get todo successfuly",
            status:200
        });
    }
    create = async(req: Request, res: Response): Promise<Response> =>{
        const service: TodoService = new TodoService(req);
        const todo = await service.store();

        return res.send({
            data: todo,
            message: "todo created successfuly",
            status:200
        });
    }
    show = async (req: Request, res: Response): Promise<Response> =>{
        const service: TodoService = new TodoService(req);
        const todo = await service.show();

        return res.send({
            data: todo,
            message: "show todo successfuly",
            status:200
        });
    }
    update = async(req: Request, res: Response): Promise<Response> => {
        const service: TodoService = new TodoService(req);
        const todo = await service.update();

        return res.send({
            message: "update todo successfuly",
            status:200
        }); 
    }
    delete = async(req: Request, res: Response): Promise<Response> => {
        const service: TodoService = new TodoService(req);
        const todo = await service.delete();

        return res.send({
            message: "delte todo successfuly",
            status:200
        }); 
    }
    
}

export default new TodoController;