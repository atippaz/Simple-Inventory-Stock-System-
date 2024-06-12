import { Body, Controller, Post } from '@nestjs/common';
import { LineService } from './line.service';
@Controller('/webhook')
export class LineController {
  constructor(private readonly lineService: LineService) {
    console.log('controller');
  }

  @Post()
  async webHook(@Body() body) {
    console.log('line');
    console.log(body);
    if (!body.events[0]) return;
    const { events } = body;
    if (!events) return;

    let reply_token = events[0].replyToken;
    // if (!array.some((x) => req.body.events[0].source.userId == x)) {
    //   array.push(req.body.events[0].source.userId);
    // }
    this.lineService.replyMessage(reply_token);
    // res.sendStatus(200);
    // const res = await this.lineService.getAll();
    // return res;
    return '';
  }
}
