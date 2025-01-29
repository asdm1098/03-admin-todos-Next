import prisma from "@/lib/prima";
import { Todo } from "@prisma/client";
import * as yup from 'yup';

interface Segments {
    params: {
        id: string;
    }
}

const getTodo = async( id: string ): Promise<Todo | null> => {
    
    const todo = await prisma.todo.findFirst({ where: { id } });
    return todo;

} 
export async function GET(request: Request, { params }: Segments) { 
    
    const { id } = params;
    
    const todo = await getTodo( id );
    if( !todo )
        return Response.json({ message: `Todo ${id} not found` }, { status: 404 } );
    
    return Response.json( todo );
}

const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional(),
});
export async function PUT(request: Request, { params }: Segments) { 

    const { id } = params;
    
    const todo = await getTodo( id );

    if( !todo )
        return Response.json({ message: `Todo ${id} not found` }, { status: 404 } );
    

    try {
        const { complete, description } = await putSchema.validate( await request.json() );
        
        const updateTodo = await prisma.todo.update({
            where: { id },
            data: { complete, description },
        })
    
        return Response.json( updateTodo );
        
    } catch (error) {
        return Response.json( error, { status: 400 } );
    }
}