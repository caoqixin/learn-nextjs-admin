import { PrismaClient } from '@prisma/client';
import {
  users,
  invoices,
  revenue,
  customers,
} from '@/app/lib/placeholder-data';
import bcrypt from 'bcrypt';
import prisma from '@/app/lib/prisma';

async function seedUsers(client: PrismaClient) {
  try {
    const insertedUsers = await client.users.createMany({
      data: users.map((user) => {
        const hashedPassword = bcrypt.hashSync(user.password, 10);

        return { email: user.email, name: user.name, password: hashedPassword };
      }),
    });

    console.log(`Seeded ${insertedUsers.count} users`);
  } catch (e) {
    console.log(e);
  }
}

async function seedCustomers(client: PrismaClient) {
  try {
    customers.map(async (customer) => {
      const insertedCustomer = await client.customers.create({
        data: {
          ...customer,
          invoices: {
            createMany: {
              data: invoices,
            },
          },
        },
      });

      console.log(`seed customers ${insertedCustomer.name} success!`);
    });
  } catch (e) {
    console.log(e);
  }
}

async function seedRevenue(client: PrismaClient) {
  try {
    const insertedRevenes = await client.revenues.createMany({
      data: revenue,
    });

    console.log(`seed customers ${insertedRevenes.count} success!`);
  } catch (e) {
    console.log(e);
  }
}

async function main() {
  await seedUsers(prisma);
  await seedCustomers(prisma);
  await seedRevenue(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((err) => {
    console.log(err);
  });
