import { Router } from "express";
const router = Router();
import { game24 } from "../functions/index.js";

router.post("/", function (req, res) {
  const numbers = req.body;
  const result = game24(numbers);
  if (result.result) {
    res.send(result.result);
  } else {
    res.status(400).send(result.error);
  }
});

export default router;
