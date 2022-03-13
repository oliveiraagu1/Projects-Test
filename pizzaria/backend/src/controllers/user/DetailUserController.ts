import { Request, Response } from 'express';
import { DetailUsersService } from '../../services/user/DetailUsersService';

class DetailUserController {

    async handle(req: Request, res: Response){

        const detailUsersService = new DetailUsersService();

        const user = await detailUsersService.execute();

        return res.json(user);
    }
}

export { DetailUserController }
