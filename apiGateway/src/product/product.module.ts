import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports:[ProxyModule],
  controllers: [ProductController]
})
export class ProductModule {}
