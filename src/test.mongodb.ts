import { prisma } from './lib/prisma';

async function testMongoDB() {
  try {
    const testUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash: 'test-hash',
        firstName: 'Test',
        lastName: 'User',
        role: 'CUSTOMER'
      }
    });
    
    console.log('✅ MongoDB connection successful!');
    console.log('Created test user:', testUser);
    
    await prisma.user.delete({
      where: { email: 'test@example.com' }
    });
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testMongoDB();