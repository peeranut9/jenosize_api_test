import { Router } from "express";
const router = Router();
import { apiKeyMiddleware } from "../middlewares/index.js";

router.get("/", apiKeyMiddleware, function (req, res) {
  console.log(req.headers);
  res.json(null);
});

export default router;
