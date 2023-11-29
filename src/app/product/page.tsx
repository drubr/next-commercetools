import Link from "next/link";
import { getProducts } from "@/lib";

export default async function ProductPage() {
  const products = await getProducts();

  if (products.length < 1) {
    return (
      <div className="p-4">
        <h1 className="text-2xl">
          All products from commercetools Merchant Center
        </h1>
        <p>No products found. :)</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl">
        All products from commercetools Merchant Center
      </h1>
      <ul className="mt-4 grid gap-2">
        {products.map((product) => (
          <li key={product.id}>
            <Link href={product.fullPath}>Show {product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
