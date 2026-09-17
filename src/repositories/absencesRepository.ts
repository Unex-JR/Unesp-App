import { db } from "@/db";
import { Absence, absences } from "@/db/schema/absences";
import { getCourseById } from "@/repositories/coursesRepository";
import { eq, sql } from "drizzle-orm";

export async function createAbsence(
  courseId: number,
  date: string,
  count: number,
): Promise<Absence> {
  const [created] = await db
    .insert(absences)
    .values({ courseId, date, count })
    .returning();
  return created;
}

export async function getAbsencesByCourse(
  courseId: number,
): Promise<Absence[]> {
  return db.query.absences.findMany({ where: eq(absences.courseId, courseId) });
}

export async function getAttendanceSummary(courseId: number): Promise<{
  absences: number;
  allowedAbsences: number;
}> {
  const [{ total }] = await db
    .select({
      total: sql<number>`coalesce(sum(${absences.count}), 0)`,
    })
    .from(absences)
    .where(eq(absences.courseId, courseId));

  const course = await getCourseById(courseId);

  const allowedAbsences = course ? Math.floor(course.creditHours * 0.25) : 15;

  return {
    absences: total,
    allowedAbsences,
  };
}
