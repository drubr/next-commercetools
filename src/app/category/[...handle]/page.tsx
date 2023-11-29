import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { getProducts } from "@/lib";

export default async function CategoryPage({
  params,
}: {
  params: { handle: string[] };
}) {
  const products = await getProducts("category", params.handle[0]);

  if (products.length === 0) {
    return (
      <div className="p-4">
        <div className="mb-2">No products found for `{params.handle}`</div>
        <Link href="/category" className="flex items-center gap-2">
          <ArrowLongLeftIcon className="h-5 w-5" />
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl">Products for Category `{params.handle}`</h1>
      <ul className="mb-2 mt-4 grid gap-2">
        {products.map((product) => (
          <li key={product.id}>
            <Link href={product.fullPath}>Show {product.title}</Link>
          </li>
        ))}
      </ul>
      <Link href="/category" className="flex items-center gap-2">
        <ArrowLongLeftIcon className="h-5 w-5" />
        Back
      </Link>
    </div>
  );
}
