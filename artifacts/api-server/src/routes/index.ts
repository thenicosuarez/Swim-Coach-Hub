import { Router, type IRouter } from "express";
import healthRouter from "./health";
import bookingsRouter from "./bookings";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(bookingsRouter);
router.use(contactRouter);

export default router;
