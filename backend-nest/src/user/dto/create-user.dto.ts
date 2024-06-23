export class CreateUserDto {
  user_email: string;
  user_password: string;
  first_name: string;
  last_name: string;
  role?: string | null;
}
