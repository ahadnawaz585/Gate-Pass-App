import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secretKey, code } from "../../environment/environment";

class AuthController {
  public generateToken(req: Request, res: Response): void {
    const { keyCode } = req.body;

    if (code !== keyCode) {
      res.status(400).send("Your code is invalid");
      return;
    }

    const token = jwt.sign({ code }, secretKey);
    res.json({ token });
  }
}

export default new AuthController();
