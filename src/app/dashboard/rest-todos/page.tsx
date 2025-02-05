import prisma from "@/lib/prima";
import { TodosGrid } from "@/todos";


export const metadata = {
 title: 'Listado de Todos',
 description: 'Listado de Todos',
};
export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' }});
  
  return (
    <div>
      {/* !TODO: Formulario para agregar */}
      <TodosGrid todos={ todos }/>
    </div>
  );
}