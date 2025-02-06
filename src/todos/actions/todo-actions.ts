'use server';

import prisma from "@/lib/prima";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const toggleTodo = async( id: string, complete: boolean ): Promise<Todo> => {
    const todo = await prisma.todo.findFirst({ where: { id }});

    if (!todo) {
        throw `Todo con id ${ id } no encontrado`;
    }

    const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { complete: complete }
    });

    revalidatePath('/dashboard/server-todos');
    return updatedTodo;
}

export const addTodo = async( description: string )/* : Promise<Todo> */ => {

    try {
    
        const todo = await prisma.todo.create({ data: { description } });
        revalidatePath('/dashboard/server-todos');
    
        return todo;
        
    } catch (error) {
        // return Response.json( error, { status: 400 } );
        return {
            message: 'Error creando todo'
        }
    }
}

export const deleteCompleted = async():Promise<void> => {
    
    await prisma.todo.deleteMany({ where: { complete: true }});
    revalidatePath('/dashboard/server-todos');
    
   
}