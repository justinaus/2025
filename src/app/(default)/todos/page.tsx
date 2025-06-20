import { TodosList } from './_components/todos-list';

export default async function Todos() {
  return (
    <main>
      <h1 className="mb-4">Todos</h1>
      <TodosList />
    </main>
  );
}
