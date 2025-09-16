import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  console.log("Seed in progress...");

  await prisma.building.createMany({
    data: [
      {
        id: "cmf2n0zj20001wflk35sqhu7o",
        name: "Candi Borobudur",
        image: "https://images.unsplash.com/photo-1623916892534-190623d38690",
        location: "Yogyakarta, Indonesia",
        description:
          "Candi Buddha terbesar di dunia yang dibangun pada abad ke-8 dan ke-9 Masehi.",
        panoramaImage:
          "https://images.unsplash.com/photo-1623916892534-190623d38690",
        rating: 5,
        reviews: 233,
        category: "Candi",
      },
      {
        id: "cmf2n0zj20001wflk35sqsj7o",
        name: "Rumah Gadang",
        image: "https://images.unsplash.com/photo-1623916892534-190623d38690",
        location: "Sumatra Barat",
        description:
          "Rumah adat Minangkabau dengan atap menyerupai tanduk kerbau.",
        panoramaImage:
          "https://images.unsplash.com/photo-1623916892534-190623d38690",
        rating: 5,
        reviews: 156,
        category: "Rumah Adat",
      },
    ],
  });

  await prisma.quizFood.createMany({
    data: [
      {
        question: "Makanan khas Padang yang terkenal adalah?",
        options: ["Rendang", "Gudeg", "Pempek", "Sate Lilit"],
        answer: "Rendang",
        category: "Sumatera",
        explanation: "Rendang berasal dari Minangkabau, Sumatera Barat.",
      },
      {
        question: "Gudeg adalah makanan khas dari?",
        options: ["Padang", "Yogyakarta", "Bali", "Medan"],
        answer: "Yogyakarta",
        category: "Jawa",
        explanation:
          "Gudeg adalah makanan khas Yogyakarta berbahan nangka muda.",
      },
    ],
  });

  console.log("Seeding completed!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
