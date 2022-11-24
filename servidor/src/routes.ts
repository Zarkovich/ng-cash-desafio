import { Router } from "express";
import { AuthenticateUserController } from "./event/authenticateUser/authenticateUserController";
import { CreateUserController } from "./event/createUser/CreateUserController";
import { GetUserInfoController } from "./event/getUserInfo/GetUserInfoController";
import { TransactionUserController } from "./event/transactionUsers/TrasactionUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const authenticateController = new AuthenticateUserController();
const transactionUserController = new TransactionUserController();
const getUserController = new GetUserInfoController();

router.post("/cadastrar", createUserController.handle);
router.post("/login", authenticateController.handle);
router.post(
  "/transaction",
  ensureAuthenticated,
  transactionUserController.handle
);
router.get("/sync", ensureAuthenticated,getUserController.handle)

export { router };
