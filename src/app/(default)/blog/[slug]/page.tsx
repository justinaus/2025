// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  //   const blog = await fetch('https://.../posts').then((res) => res.json())
  const data = ['react-tips', 'how-to-learn-react'];

  return data.map((post) => ({
    slug: post,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main>
      <h1 className="mb-4">{slug}</h1>
    </main>
  );
}
