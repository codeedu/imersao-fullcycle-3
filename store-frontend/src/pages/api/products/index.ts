import type { NextApiRequest, NextApiResponse } from "next";
import { Product, products } from "../../../model";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  res.status(200).json(products);
}
