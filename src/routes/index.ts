import { Router } from "express";

import { ensureAutehnticated } from "../middlewares/ensureAuthenticated";
import { authRoutes } from "./authenticate.routes";
import { categoryRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const routers = Router();
routers.use("/sessions", authRoutes);
routers.use(ensureAutehnticated);
routers.use("/categories", categoryRoutes);
routers.use("/specifications", specificationsRoutes);
routers.use("/users", usersRoutes);

export default routers;
