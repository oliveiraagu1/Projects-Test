import { prisma } from '../src/lib/prisma';

async function seed() {
    await prisma.event.create({
        data: {
            id: '321312-2321-sad2-2314-32141321as',
            title: 'Test',
            slug: 'test-test',
            details: 'test test test test',
            maximumAttendees: 120,
        }
    })
}

seed().then(() => {
    console.log('Database seeded!');
    prisma.$disconnect();
})