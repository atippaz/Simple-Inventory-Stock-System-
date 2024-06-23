import { Injectable } from '@nestjs/common';
import { env } from 'process';
import * as request from 'request';
import { Message } from './line.dto';
export interface Recription {
  product_id: number;
  product_name: string;
  category: string;
  product_description: string;
  sku_id: string;
  sku_description: string;
  created_date: Date;
  title: string;
  description: string;
  qty: number;
  cost: number;
  receipt_id: number;
}

@Injectable()
export class LineService {
  accessToken = env.LINE_TOKEN;
  ids: string[] = [];
  sendMessageToLineOffical() {}
  register(message: Message, idUser: string) {
    console.log(message);
    if (
      message.text.toLowerCase() === 'register' &&
      !this.ids.some((x) => x == idUser)
    ) {
      this.ids.push(idUser);
      this.sendMessageToUserId(idUser, 'register success');
      return;
    }
    // this.lineService.replyMessage(reply_token);
  }
  sendRequisitionData() {}
  sendReceiptionData() {}
  sendMessageToUserId(userId, text) {
    let body = {
      to: userId,
      messages: [
        {
          type: 'flex', // 1
          altText: 'This is a Flex Message',
          contents: {
            type: 'bubble',
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  margin: 'lg',
                  spacing: 'sm',
                  contents: [
                    {
                      type: 'box',
                      layout: 'baseline',
                      spacing: 'sm',
                      contents: [
                        {
                          type: 'text',
                          text: text,
                          wrap: true,
                          color: '#666666',
                          size: 'sm',
                          flex: 5,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            footer: {
              type: 'box',
              layout: 'vertical',
              spacing: 'sm',
              contents: [
                {
                  type: 'button',
                  style: 'link',
                  height: 'sm',
                  action: {
                    type: 'uri',
                    label: 'Contract',
                    uri: 'https://github.com/atippaz',
                  },
                },
              ],
              flex: 0,
            },
          },
        },
      ],
    };
    this.sendRequest(JSON.stringify(body));
  }
  private sendRequest(body: string) {
    let headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.accessToken}`,
    };
    console.log(headers);
    request.post(
      {
        url: 'https://api.line.me/v2/bot/message/push',
        headers: headers,
        body: body,
      },
      (err, res, body) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('status = ' + res.statusCode);
      },
    );
  }
  // let body = {
  //   to: userId,
  //   messages: [
  //     {
  //       type: 'flex', // 1
  //       altText: 'This is a Flex Message',
  //       contents: {
  //         type: 'bubble',
  //         hero: {
  //           type: 'image',
  //           url: 'https://developers-resource.landpress.line.me/fx/img/01_1_cafe.png',
  //           size: 'full',
  //           aspectRatio: '20:13',
  //           aspectMode: 'cover',
  //           action: {
  //             type: 'uri',
  //             uri: 'https://line.me/',
  //           },
  //         },
  //         body: {
  //           type: 'box',
  //           layout: 'vertical',
  //           contents: [
  //             {
  //               type: 'text',
  //               text: text,
  //               weight: 'bold',
  //               size: 'xl',
  //             },

  //             {
  //               type: 'box',
  //               layout: 'vertical',
  //               margin: 'lg',
  //               spacing: 'sm',
  //               contents: [
  //                 {
  //                   type: 'box',
  //                   layout: 'baseline',
  //                   spacing: 'sm',
  //                   contents: [
  //                     {
  //                       type: 'text',
  //                       text: 'Time',
  //                       color: '#aaaaaa',
  //                       size: 'sm',
  //                       flex: 1,
  //                     },
  //                     {
  //                       type: 'text',
  //                       text: Date.now().toLocaleString(),
  //                       wrap: true,
  //                       color: '#666666',
  //                       size: 'sm',
  //                       flex: 5,
  //                     },
  //                   ],
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //         footer: {
  //           type: 'box',
  //           layout: 'vertical',
  //           spacing: 'sm',
  //           contents: [
  //             {
  //               type: 'button',
  //               style: 'link',
  //               height: 'sm',
  //               action: {
  //                 type: 'uri',
  //                 label: 'GOOGLE',
  //                 uri: 'https://www.google.co.th/?hl=th',
  //               },
  //             },
  //             {
  //               type: 'button',
  //               style: 'link',
  //               height: 'sm',
  //               action: {
  //                 type: 'uri',
  //                 label: 'FASTWORK',
  //                 uri: 'https://fastwork.co/user/lulrwatp',
  //               },
  //             },
  //             {
  //               type: 'box',
  //               layout: 'vertical',
  //               contents: [],
  //               margin: 'sm',
  //             },
  //           ],
  //           flex: 0,
  //         },
  //       },
  //     },
  //   ],
  // };
}
