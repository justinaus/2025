export const revalidate = 60;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const data = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  const posts = await data.json();

  return Response.json(posts);
}
