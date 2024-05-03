import BaseRoutes from "./BaseRoutes";

// controller
import AuthController from '../Controllers/AuthController';
import {validateRegister, validateLogin} from "../Middlewares/AuthValidator";
import { auth } from "../Middlewares/AuthMiddlewate";

class UserRoutes extends BaseRoutes{

    public routes(): void {
        this.router.post("/register",validateRegister, AuthController.register);
        this.router.post("/login", validateLogin, AuthController.login);
        this.router.get("/profile", auth, AuthController.profile);
    }
}

export default new UserRoutes().router;