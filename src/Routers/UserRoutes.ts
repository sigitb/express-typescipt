import BaseRoutes from "./BaseRoutes";
import { auth } from "../Middlewares/AuthMiddlewate";
// controller
import UserController from "../Controllers/UserController";

class UserRoutes extends BaseRoutes{
   
    public routes(): void {
        this.router.get("/", auth,UserController.index);
        this.router.post("/", UserController.create);
        this.router.get("/:id", UserController.show);
        this.router.put("/:id", UserController.update);
        this.router.delete("/:id", UserController.delete);
    }
}

export default new UserRoutes().router;