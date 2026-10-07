import { db } from "@/db";
import { courses, type Course, type NewCourse } from "@/db/schema/courses";
import { and, eq } from "drizzle-orm";

export async function createCourse(data: NewCourse): Promise<Course> {
  const [created] = await db.insert(courses).values(data).returning();
  return created;
}

export async function editCourse(
  id: number,
  data: Partial<NewCourse>,
): Promise<Course> {
  const [updated] = await db
    .update(courses)
    .set(data)
    .where(eq(courses.id, id))
    .returning();

  return updated;
}

export async function deleteCourse(id: number): Promise<void> {
  await db.delete(courses).where(eq(courses.id, id));
}

export async function getCourseById(id: number): Promise<Course | undefined> {
  return db.query.courses.findFirst({ where: eq(courses.id, id) });
}

export async function getAllCoursesByUser(
  userId: number,
  semesterId?: number,
): Promise<Course[]> {
  return db.query.courses.findMany({
    where: semesterId
      ? and(eq(courses.userId, userId), eq(courses.semesterId, semesterId))
      : eq(courses.userId, userId),
  });
}
