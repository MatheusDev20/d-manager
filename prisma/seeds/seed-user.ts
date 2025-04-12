import { PrismaClient } from "../../app/generated/prisma";
const prisma = new PrismaClient();

async function createUser() {
  try {
    const newUser = await prisma.users.create({
      data: {
        email: "matheusdev20@gmail.com",
        password: "mypassword",
        organizationId: "cm9dqlhh00000xvvih70did34",
      },
    });

    console.log("Created User", newUser);
    return newUser;
  } catch (error) {
    console.error("Error creating organization:", error);
    throw error;
  }
}

async function main() {
  await createUser();
}

main();
