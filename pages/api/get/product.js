import { product } from "../../../prisma";

export default async function getProduct(req, res) {
  if (req.method !== "GET")
    return res.status(400).send({ message: "Not found" });

  const products = await product.findMany();

  return res.status(200).json(products);
}
