import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const { parse: uuidParse, stringify: uuidStringify } = require('uuid');

@Injectable()
export default class PrismaService extends PrismaClient {
  constructor() {
    super();
    // this.$use(async (params, next) => {
    //   if (params.action === 'create' || params.action === 'update')
    //     return next(params);
    //   console.log('mid 2 asdasd ');
    //   const result = await next(params);
    //   const transformResult = (result) => {
    //     if (Array.isArray(result)) {
    //       result.forEach(transformResult);
    //     } else if (result && typeof result === 'object') {
    //       Object.keys(result).forEach((key) => {
    //         if (Buffer.isBuffer(result[key]) && result[key].length === 16) {
    //           result[key] = uuidStringify(result[key]);
    //         }
    //       });
    //     }
    //   };

    //   transformResult(result);
    //   return result;
    // });

    // // Middleware สำหรับแปลง UUID string เป็น binary 16-byte ก่อนบันทึก
    // this.$use(async (params, next) => {
    //   if (params.action !== 'create' && params.action !== 'update')
    //     return next(params);
    //   console.log('mid 1 ');
    //   const transformArgs = (args) => {
    //     if (args && typeof args === 'object') {
    //       Object.keys(args).forEach((key) => {
    //         if (
    //           typeof args[key] === 'string' &&
    //           args[key].match(/^[0-9a-fA-F-]{36}$/)
    //         ) {
    //           args[key] = Buffer.from(uuidParse(args[key]));
    //         } else if (typeof args[key] === 'object') {
    //           transformArgs(args[key]);
    //         }
    //       });
    //     }
    //   };
    //   transformArgs(params.args.data);
    //   return next(params);
    // });
  }
}
