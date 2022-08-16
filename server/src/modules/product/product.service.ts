import prisma from '../../utils/prisma';
import { CreateProductInput } from './product.schema';

export const createProduct = async (
  data: CreateProductInput & { ownerId: number }
) => {
  return prisma.product.create({ data });
};

export const getProducts = async () => {
  return prisma.product.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      price: true,
      createdAt: true,
      updatedAt: true,
      owner: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};
