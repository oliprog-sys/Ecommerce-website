import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.product.create({
  data: {
    name: "Test Product",
    slug: "test-product",
    description: "Sample product",
    price: 29.99,
    sku: "SKU123",
    stockQuantity: 10,
    isPublished: true,
  },
});
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
  })