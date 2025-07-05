import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  //hay que agregar el proxy moule par aque este modulo haga la conexion con RabbitMQ
  imports:[ProxyModule],
  controllers: [UserController],
})
export class UserModule {}
