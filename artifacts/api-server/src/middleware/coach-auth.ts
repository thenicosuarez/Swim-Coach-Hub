import type { Request, Response, NextFunction } from "express";

export function coachAuth(req: Request, res: Response, next: NextFunction) {
  const password = req.headers["x-coach-password"] as string;
  if (!process.env.COACH_PASSWORD) {
    res.status(500).json({ error: "COACH_PASSWORD not configured" });
    return;
  }
  if (!password || password !== process.env.COACH_PASSWORD) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
