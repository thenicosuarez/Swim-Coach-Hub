import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();

app.use(cors());
app.use(
  express.json({
    verify: (req: Request, _res: Response, buf: Buffer) => {
      (req as unknown as Record<string, unknown>).rawBody = buf.toString("utf8");
    },
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
