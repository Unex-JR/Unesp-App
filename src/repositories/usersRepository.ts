import { db } from "@/db";
import { users, type NewUser, type User } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export async function insertUser(data: NewUser): Promise<User> {
  const [created] = await db.insert(users).values(data).returning();
  return created;
}

export async function updateUser(
  id: number,
  data: Partial<NewUser>,
): Promise<User | undefined> {
  const [updated] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
  return updated;
}

export async function deleteUser(id: number): Promise<void> {
  await db.delete(users).where(eq(users.id, id));
}

export async function getUserById(id: number): Promise<User | undefined> {
  return db.query.users.findFirst({ where: eq(users.id, id) });
}
