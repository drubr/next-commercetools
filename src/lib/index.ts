import { promises as fs } from "fs";
import { Category, Product } from "@/interfaces";
import { formatProductTitle } from "@/helpers";

export async function getData(): Promise<{
  products: Product[];
  categories: Category[];
}> {
  if (process.env.NODE_ENV === "development") {
    const res = await fs.readFile(process.cwd() + "/public/data.json", "utf8");
    return JSON.parse(res);
  } else {
    const res = await fetch("https://next-commercetools.vercel.app/data.json");
    return res.json();
  }
}

export async function getProducts(
  filter?: "category" | "searchParams",
  filterValue?: string,
): Promise<Product[]> {
  const { products } = await getData();

  if (filter === undefined || filterValue === undefined) {
    return products;
  }

  switch (filter) {
    case "category":
      return products.filter(
        (product) =>
          product.category.toLowerCase() === filterValue.toLowerCase(),
      );
    default:
      return products;
  }
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const { products } = await getData();
  return products.find(
    (product) =>
      product.id.toString() === handle ||
      formatProductTitle(product.title) === formatProductTitle(handle),
  );
}

export async function getCategories(): Promise<Category[]> {
  const { categories } = await getData();
  return categories;
}
