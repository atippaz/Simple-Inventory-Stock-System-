import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import PrismaService from 'src/utils/prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const result = await this.prisma.$transaction(async (prisma) => {
      try {
        const oldUser = await prisma.user.findFirstOrThrow({
          where: {
            user_email: createUserDto.user_email,
          },
        });
        if (oldUser) {
          throw new BadRequestException('duplicate email');
        }
        const newUser = await prisma.user.create({
          data: {
            first_name: createUserDto.first_name,
            last_name: createUserDto.last_name,
            user_email: createUserDto.user_email,
            user_password: createUserDto.user_password,
          },
          select: { user_id: true },
        });
        return newUser.user_id;
      } catch (error) {
        console.error(error);
        throw error;
      }
    });
    return result;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findFirstOrThrow({
      where: {
        user_email: email,
      },
      select: {
        first_name: true,
        last_name: true,
        role: true,
        user_email: true,
        user_id: true,
        user_password: true,
      },
    });
  }
}
