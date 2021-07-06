import type { NextApiRequest, NextApiResponse } from "next";
import { Product, products } from "../../../model";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | { message: string }>
) {
  const { slug } = req.query;
  const product = products.find((p) => p.slug === slug);
  product
    ? res.status(200).json(product)
    : res.status(404).json({ message: "Product not found" });
}

