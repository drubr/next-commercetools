import { promises as fs } from "fs";
import { Product } from "@/interfaces";
import { formatProductTitle } from "@/helpers";

export async function getData(): Promise<{
  products: Product[];
}> {
  if (process.env.NODE_ENV === "development") {
    const res = await fs.readFile(process.cwd() + "/public/data.json", "utf8");
    return JSON.parse(res);
  } else {
    const res = await fetch("https://next-commercetools.app/data.json");
    return res.json();
  }
}

export async function getProducts(): Promise<Product[]> {
  const { products } = await getData();
  return products;
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const { products } = await getData();
  return products.find(
    (product) =>
      product.id.toString() === handle ||
      formatProductTitle(product.title) === formatProductTitle(handle),
  );
}
