import { FastifyRequest } from 'fastify';
import { CreateProductInput } from './product.schema';
import { createProduct, getProducts } from './product.service';

export const createProductHandler = async (
  request: FastifyRequest<{
    Body: CreateProductInput;
  }>
) => {
  const { body, user } = request;

  const product = await createProduct({
    ...body,
    ownerId: user.id,
  });

  return product;
};

export const getProductsHandler = async () => {
  const products = await getProducts();
  return products;
};
