import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LineService } from './line.service';
import { LineWebHookPayload } from './line.dto';

@Controller('/webhook')
export class LineController {
  constructor(private readonly lineService: LineService) {
    console.log('controller');
  }

  @Post()
  async webHook(@Body() body: LineWebHookPayload) {
    if (!body.events) return;
    if (!body.events.length) return;
    try {
      const event = body.events[0];
      this.lineService.register(event.message, event.source.userId);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
