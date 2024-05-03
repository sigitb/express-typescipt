import express, {Application, Request, Response} from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cors from 'cors'
import {config as dotenv} from 'dotenv';

// Routers
import UserRoutes from "./Routers/UserRoutes";
import AuthRoutes from "./Routers/AuthRoutes";
import TodoRoutes from "./Routers/TodoRoutes";


class App {
    public app: Application;
    
    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins(): void{
        this.app.use(bodyParser.json());
        this.app.use(morgan("dev"));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    protected routes(): void{
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("routing to typescript");
        });
        this.app.use("/api/v1/auth", AuthRoutes)
        this.app.use("/api/v1/users", UserRoutes)
        this.app.use("/api/v1/todos", TodoRoutes)
    }
}

const port: number = 8080;
const app = new App().app;
app.listen(port, () => {
    console.log("aplikasi ini berjalan dengan port " + port);

});
// const app = express();


// app.route('/').get((req, res) => {
//     res.send("hi")
// })


// app.listen(8080)