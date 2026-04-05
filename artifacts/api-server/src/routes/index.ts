import { Router, type IRouter } from "express";
import healthRouter from "./health";
import bookingsRouter from "./bookings";
import contactRouter from "./contact";
import coachRouter from "./coach";
import webhooksRouter from "./webhooks";

const router: IRouter = Router();

router.use(healthRouter);
router.use(webhooksRouter);
router.use(bookingsRouter);
router.use(contactRouter);
router.use(coachRouter);

export default router;
