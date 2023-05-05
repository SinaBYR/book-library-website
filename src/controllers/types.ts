import { User } from '@prisma/client';

export interface RegisterReqBody extends Omit<User, 'name'|'id'|'createdAt'|'updatedAt'> {
  fullName: string;
  repeatPassword: string;
}