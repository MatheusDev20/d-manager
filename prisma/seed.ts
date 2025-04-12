import { PrismaClient } from "../src/app/generated/prisma";
const prisma = new PrismaClient();

const aktieDevs = [
  {
    name: "Guilherme Andara",
    picture: "https://avatars.githubusercontent.com/u/82895212?v=4",
    status: "ativo",
  },
  {
    name: "Matheus de Paula",
    picture: "https://avatars.githubusercontent.com/u/55402924?v=4",
    status: "ativo",
  },
  {
    name: "Renata Magno",
    picture: "https://avatars.githubusercontent.com/u/88847677?v=4",
    status: "ativo",
  },
  {
    name: "João Macedo",
    picture: "https://avatars.githubusercontent.com/u/22161697?v=4",
    status: "ativo",
  },
  {
    name: "Eduardo Meira",
    picture: "https://avatars.githubusercontent.com/u/41128583?v=4",
    status: "ativo",
  },
];

export async function main() {
  for (const u of aktieDevs) {
    await prisma.developer.create({ data: u });
  }
}

main();
