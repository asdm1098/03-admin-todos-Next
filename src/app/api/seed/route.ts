import prisma from "@/lib/prima";

export async function GET(request: Request) { 

    await prisma.todo.deleteMany();

    await prisma.todo.createMany({
        data: [
            { description: 'Piedra del alma', complete: true },
            { description: 'Piedra del tiempo', complete: true },
            { description: 'Piedra del espacio' },
            { description: 'Piedra de la mente'},
            { description: 'Piedra del cuerpo' },
        ]
    });

    return Response.json({ message: 'Seed Executed'});
 
}