import { db } from "../../db";
import { orders, orderItems, tables, products } from "../../db";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

const formatOrderResponse = (order: any) => ({
  id: order.id,
  tableId: order.tableId,
  tableName: order.tables?.name || 'Unknown',
  total: Number(order.totalPrice) || 0,
  status: order.status,
  createdAt: order.createdAt?.toISOString() || new Date().toISOString(),
  items: order.items || []
});

export const getOrders = async () => {
  const allOrders = await db.select().from(orders).leftJoin(tables, eq(orders.tableId, tables.id));
  
  const ordersWithItems = await Promise.all(allOrders.map(async (row) => {
    const orderData = row.orders;
    const tableData = row.tables;
    
    const items = await db.select({
      productId: orderItems.productId,
      quantity: orderItems.qty,
      price: orderItems.priceSnapshot,
      productName: products.name
    }).from(orderItems).leftJoin(products, eq(orderItems.productId, products.id)).where(eq(orderItems.orderId, orderData.id));
    
    return {
      ...orderData,
      tables: tableData,
      items: items.map(item => ({
        productId: item.productId,
        productName: item.productName || 'Unknown',
        quantity: Number(item.quantity) || 0,
        price: Number(item.price) || 0
      }))
    };
  }));
  
  return ordersWithItems.map(formatOrderResponse);
};

export const getOrderById = async (id: string) => {
  const orderRow = await db.select().from(orders).leftJoin(tables, eq(orders.tableId, tables.id)).where(eq(orders.id, id)).limit(1);
  
  if (!orderRow.length) return null;
  
  const orderData = orderRow[0].orders;
  const tableData = orderRow[0].tables;
  
  const items = await db.select({
    productId: orderItems.productId,
    quantity: orderItems.qty,
    price: orderItems.priceSnapshot,
    productName: products.name
  }).from(orderItems).leftJoin(products, eq(orderItems.productId, products.id)).where(eq(orderItems.orderId, id));
  
  const orderWithItems = {
    ...orderData,
    tables: tableData,
    items: items.map(item => ({
      productId: item.productId,
      productName: item.productName || 'Unknown',
      quantity: Number(item.quantity) || 0,
      price: Number(item.price) || 0
    }))
  };
  
  return formatOrderResponse(orderWithItems);
};

export const createOrder = async (body: {
  tableId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
}) => {
  const orderId = randomUUID();
  const total = body.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Create order
  await db.insert(orders).values({
    id: orderId,
    tableId: body.tableId,
    totalPrice: total.toString(),
    status: "pending"
  });

  // Create order items
  for (const item of body.items) {
    await db.insert(orderItems).values({
      id: randomUUID(),
      orderId,
      productId: item.productId,
      qty: item.quantity.toString(),
      priceSnapshot: item.price.toString()
    });
  }

  const createdOrder = await getOrderById(orderId);
  return createdOrder;
};

export const updateOrder = async (id: string, body: {
  status?: string;
}) => {
  const updates: any = {};
  if (body.status) updates.status = body.status;

  await db.update(orders).set(updates).where(eq(orders.id, id));
  
  const updatedOrder = await getOrderById(id);
  return updatedOrder;
};

export const deleteOrder = async (id: string) => {
  // Delete order items first
  await db.delete(orderItems).where(eq(orderItems.orderId, id));
  // Then delete order
  return db.delete(orders).where(eq(orders.id, id));
};
