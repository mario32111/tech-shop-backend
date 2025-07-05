import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports:[ProxyModule],
  controllers: [AuthController]})
export class AuthModule {}
