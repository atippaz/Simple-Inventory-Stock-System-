import { Module } from '@nestjs/common';
import { AppController } from './product.controller';
import { AppService } from './product.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {
  constructor() {
    console.log('init product');
  }
}
