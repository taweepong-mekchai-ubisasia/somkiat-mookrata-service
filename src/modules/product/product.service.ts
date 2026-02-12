import { db } from "../../db";
import { products } from "../../db";
import { randomUUID } from "crypto";
import { eq, like, or } from "drizzle-orm";

export const getProducts = async () => {
  return db.select().from(products);
};

export const searchProducts = async (query: string) => {
  if (!query || query.trim() === '') {
    return db.select().from(products);
  }
  
  const searchTerm = `%${query}%`;
  return db.select().from(products).where(
    or(
      like(products.name, searchTerm),
      like(products.category, searchTerm),
      like(products.description, searchTerm)
    )
  );
};

export const getProductById = async (id: string) => {
  return db.select().from(products).where(eq(products.id, id));
};

export const createProduct = async (body: {
  name: string;
  category: string;
  price: number;
  description?: string;
  image?: string;
}) => {
  const result = await db.insert(products).values({
    id: randomUUID(),
    name: body.name,
    category: body.category,
    description: body.description || '',
    image: body.image || null,
    price: body.price.toString(),
    isAvailable: true
  });
  return result;
};

export const updateProduct = async (id: string, body: {
  name?: string;
  category?: string;
  price?: number;
  description?: string;
  image?: string;
  isAvailable?: boolean;
}) => {
  const updates: any = {};
  if (body.name) updates.name = body.name;
  if (body.category) updates.category = body.category;
  if (body.price) updates.price = body.price.toString();
  if (body.description !== undefined) updates.description = body.description;
  if (body.image !== undefined) updates.image = body.image;
  if (body.isAvailable !== undefined) updates.isAvailable = body.isAvailable;

  return db.update(products).set(updates).where(eq(products.id, id));
};

export const deleteProduct = async (id: string) => {
  return db.delete(products).where(eq(products.id, id));
};
