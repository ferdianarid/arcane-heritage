import path from "node:path";
import type { PrismaConfig } from "prisma";

import "dotenv/config";

export default {
  experimental: {
    adapter: true,
  },

  schema: path.join("prisma", "schema.prisma"),
} satisfies PrismaConfig;
