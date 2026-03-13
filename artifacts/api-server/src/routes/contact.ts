import { Router, type IRouter } from "express";
import { SubmitContactBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  try {
    const body = SubmitContactBody.parse(req.body);
    console.log(`New contact from ${body.name} <${body.email}>: ${body.message}`);
    res.json({ success: true, message: "Thanks for reaching out! I'll get back to you within 24 hours." });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Invalid contact data" });
  }
});

export default router;
