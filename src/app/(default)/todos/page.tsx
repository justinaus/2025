import { TodosList } from './components/todos-list';
import { fetchTodos } from './lib/api';

export default async function Todos() {
  const initialData = await fetchTodos({ page: 1, limit: 10 });

  return (
    <main>
      <h1 className="mb-4">Todos</h1>
      <TodosList initialData={initialData} />
    </main>
  );
}
