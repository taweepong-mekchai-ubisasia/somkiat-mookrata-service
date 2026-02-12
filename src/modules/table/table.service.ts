import { db } from "../../db";
import { tables, tableReservations } from "../../db";
import { randomUUID } from "crypto";
import { eq, and } from "drizzle-orm";
import QRCode from "qrcode";

export const getTables = async () => {
  return db.select().from(tables);
};

export const getTableById = async (id: string) => {
  return db.select().from(tables).where(eq(tables.id, id));
};

export const createTable = async (body: {
  name: string;
  seats?: number;
}) => {
  const id = randomUUID();
  const qrToken = randomUUID();
  
  // Generate QR code
  const qrCode = await QRCode.toDataURL(`table-${id}-${qrToken}`);
  
  return db.insert(tables).values({
    id,
    name: body.name,
    seats: body.seats || 4,
    qrToken,
    qrCode,
    status: "available"
  });
};

export const updateTable = async (id: string, body: {
  name?: string;
  seats?: number;
  status?: string;
}) => {
  const updates: any = {};
  if (body.name) updates.name = body.name;
  if (body.seats) updates.seats = body.seats;
  if (body.status) updates.status = body.status;

  return db.update(tables).set(updates).where(eq(tables.id, id));
};

export const deleteTable = async (id: string) => {
  // Delete reservations first
  await db.delete(tableReservations).where(eq(tableReservations.tableId, id));
  // Then delete table
  return db.delete(tables).where(eq(tables.id, id));
};

export const getReservations = async () => {
  return db.select().from(tableReservations);
};

export const createReservation = async (body: {
  tableId: string;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}) => {
  // Verify table exists and has enough seats
  const table = await db.select().from(tables).where(eq(tables.id, body.tableId));
  
  if (!table || table.length === 0) {
    throw new Error("Table not found");
  }
  
  if (table[0].seats < body.guests) {
    throw new Error(`Table only has ${table[0].seats} seats for ${body.guests} guests`);
  }

  // Check if already reserved at that time
  const existingReservation = await db.select().from(tableReservations).where(
    and(
      eq(tableReservations.tableId, body.tableId),
      eq(tableReservations.date, body.date),
      eq(tableReservations.time, body.time)
    )
  );

  if (existingReservation && existingReservation.length > 0) {
    throw new Error("This table is already reserved at that time");
  }

  return db.insert(tableReservations).values({
    id: randomUUID(),
    tableId: body.tableId,
    customerName: body.customerName,
    phone: body.phone,
    date: body.date,
    time: body.time,
    guests: body.guests
  });
};

export const deleteReservation = async (id: string) => {
  return db.delete(tableReservations).where(eq(tableReservations.id, id));
};

