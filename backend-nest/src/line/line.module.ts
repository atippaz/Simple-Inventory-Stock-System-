import { Module } from '@nestjs/common';
import { LineController } from './line.controller';
import { LineService } from './line.service';

@Module({
  imports: [],
  controllers: [LineController],
  providers: [LineService],
  exports: [LineService],
})
export default class LineModule {
  constructor() {
    console.log('init product');
  }
}
