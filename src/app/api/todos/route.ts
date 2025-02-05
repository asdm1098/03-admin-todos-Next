import prisma from "@/lib/prima";
import * as yup from "yup";

export async function GET(request: Request) { 
    const { searchParams } = new URL(request.url)
    const take = Number( searchParams.get('take') ?? '10' );
    const skip = Number( searchParams.get('skip') ?? '0' );


    if( isNaN(take)){
        return Response.json({ message: 'take must be a number' }, { status: 400 } );
    }

    if( isNaN(skip)){
        return Response.json({ message: 'take must be a number' }, { status: 400 } );
    }

    const todos = await prisma.todo.findMany({ take, skip });

    return Response.json( todos );
}

const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),
});
export async function POST(request: Request) { 

    try {
        const { description, complete } = await postSchema.validate( await request.json() );
    
        const todo = await prisma.todo.create({ data: { description, complete } });
    
        return Response.json(todo);
        
    } catch (error) {
        return Response.json( error, { status: 400 } );
    }
}

export async function DELETE(request: Request) { 

    try {
        await prisma.todo.deleteMany({ where: { complete: true }});
        return Response.json('Borrados');
        
    } catch (error) {
        return Response.json( error, { status: 400 } );
    }
}