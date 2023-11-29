import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/app/category/loading";
import { getCategories } from "@/lib";

export default async function CategoryPage() {
  const categories = await getCategories();

  if (categories.length < 1) {
    return (
      <div className="p-4">
        <h1 className="text-2xl">
          All categories from commercetools Merchant Center
        </h1>
        <p>No catgories found. :)</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="p-4">
        <h1 className="text-2xl">All Categories</h1>

        <ul className="mt-4 grid gap-2">
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={category.fullPath}>Show {category.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Suspense>
  );
}
