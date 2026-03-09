import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
 const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Electronic devices, gadgets, and accessories',
    },
  })

  const clothing = await prisma.category.create({
    data: {
      name: 'Clothing',
      slug: 'clothing',
      description: 'Apparel, fashion, and accessories',
    },
  })

  const books = await prisma.category.create({
    data: {
      name: 'Books',
      slug: 'books',
      description: 'Books, eBooks, and publications',
    },
  })

  const homeGarden = await prisma.category.create({
    data: {
      name: 'Home & Garden',
      slug: 'home-garden',
      description: 'Home decor, furniture, and garden supplies',
    },
  })

  // Create subcategories for Electronics
  const smartphones = await prisma.category.create({
    data: {
      name: 'Smartphones',
      slug: 'smartphones',
      description: 'Mobile phones and accessories',
      parentId: electronics.id,
    },
  })

  const laptops = await prisma.category.create({
    data: {
      name: 'Laptops',
      slug: 'laptops',
      description: 'Notebooks and computers',
      parentId: electronics.id,
    },
  })

  // Create subcategories for Clothing
  const mensClothing = await prisma.category.create({
    data: {
      name: "Men's Clothing",
      slug: 'mens-clothing',
      description: "Clothing for men",
      parentId: clothing.id,
    },
  })

  const womensClothing = await prisma.category.create({
    data: {
      name: "Women's Clothing",
      slug: 'womens-clothing',
      description: "Clothing for women",
      parentId: clothing.id,
    },
  })

  console.log('Categories created:')
  console.log('- Electronics (with subcategories: Smartphones, Laptops)')
  console.log('- Clothing (with subcategories: Mens, Womens)')
  console.log('- Books')
  console.log('- Home & Garden')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
  })