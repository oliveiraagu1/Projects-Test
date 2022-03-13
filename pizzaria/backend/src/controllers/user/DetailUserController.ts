import { Request, Response } from 'express';
import { DetailUsersService } from '../../services/user/DetailUsersService';

class DetailUserController {

    async handle(req: Request, res: Response){

        const user_id = req.user_id;
        const detailUsersService = new DetailUsersService();
        const user = await detailUsersService.execute(user_id);
        return res.json(user);
    }
}

export { DetailUserController }
