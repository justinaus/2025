import { TodosList } from './components/todos-list';
import { DEFAULT_LIMIT, fetchTodos } from './lib/api';

export default async function Todos() {
  const initialData = await fetchTodos({ page: 1, limit: DEFAULT_LIMIT });

  return (
    <main>
      <h1 className="mb-4">Todos</h1>
      <TodosList initialData={initialData} />
    </main>
  );
}
