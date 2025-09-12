import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserProfile } from './models/user-profile.model';

@Module({
  imports: [
    SequelizeModule.forFeature([UserProfile]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
