import { prisma } from '@/config/database';
import { Prisma } from '@prisma/client';

async function findByEmail(email: string) {
console.log(email)
  const temp = prisma.user.findFirst({
    where: { email },
  });
console.log(temp)
return temp
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

const userRepository = {
  findByEmail,
  create,
};

export default userRepository;
