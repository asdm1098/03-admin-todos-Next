import prisma from "@/lib/prima";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {

    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
        data: {
            email: 'test@google.com',
            name: 'test',
            password: bcrypt.hashSync('123456'),
            roles: ['admin', 'client', 'super-user'],
            todos: {
                create: [
                    { description: 'Piedra del alma', complete: true },
                    { description: 'Piedra del tiempo', complete: true },
                    { description: 'Piedra del espacio' },
                    { description: 'Piedra de la mente' },
                    { description: 'Piedra del cuerpo' },
                ]
            }
        }
    });

    // await prisma.todo.createMany({
    //     data: [
    // { description: 'Piedra del alma', complete: true },
    // { description: 'Piedra del tiempo', complete: true },
    // { description: 'Piedra del espacio' },
    // { description: 'Piedra de la mente'},
    // { description: 'Piedra del cuerpo' },
    //     ]
    // });

    return Response.json({ message: 'Seed Executed' });

}