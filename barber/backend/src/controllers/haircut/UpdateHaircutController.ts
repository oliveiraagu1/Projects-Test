import { Request, Response } from "express";
import { UpdateHaircutService } from "../../services/haircut/UpdateHaircutService";

class UpdateHaircutController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const { name, price, status, haircut_id }  = req.body;

    const updateHaircutService = new UpdateHaircutService();

    const haircut = await updateHaircutService.execute({ name, price, status, user_id, haircut_id });

    return res.json(haircut);
  }
}

export { UpdateHaircutController };
