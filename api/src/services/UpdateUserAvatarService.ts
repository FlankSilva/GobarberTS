import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';

interface Request {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new Error('Only authenticated usres can change avatar');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await userRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
