import { PrismaClient } from "../../src/app/generated/prisma";
const prisma = new PrismaClient();

async function createOrganization() {
  try {
    const newOrg = await prisma.oRG.create({
      data: {
        name: "My New Organization",
        picture: "https://example.com/logo.png",
        // No need to provide users array here
      },
    });

    return newOrg;
  } catch (error) {
    console.error("Error creating organization:", error);
    throw error;
  }
}

async function main() {
  await createOrganization();
}

main();
