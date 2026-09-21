import { db } from "@/db";
import { ScheduleSlot, NewScheduleSlot, scheduleSlots } from "@/db/schema/scheduleSlots";
import { courses } from "@/db/schema/courses";
import { eq, sql } from "drizzle-orm";

export async function createSlot(
    data: NewScheduleSlot
): Promise<ScheduleSlot> {
    const [created] = await db
        .insert(scheduleSlots)
        .values(data)
        .returning();
    return created;
}

export async function editSlot(
    id: number,
    data: Partial<NewScheduleSlot>
): Promise<ScheduleSlot> {
    const [updated] = await db
        .update(scheduleSlots)
        .set(data)
        .where(eq(scheduleSlots.id, id))
        .returning();
    return updated;
}

export async function deleteSlot(
    id: number
): Promise<void> {
    await db.delete(scheduleSlots).where(eq(scheduleSlots.id, id));
}

export async function getSlotsByCourse(
    courseId: number
): Promise<ScheduleSlot[]> {
    return db.query.scheduleSlots.findMany({ where: eq(scheduleSlots.courseId, courseId)});
}

export async function getSlotsByUser(
    userId: number
): Promise<ScheduleSlot[]> {
    const result = await db
        .select({
            scheduleSlots
        })
        .from(scheduleSlots)
        .innerJoin(courses, eq(scheduleSlots.courseId, courses.id))
        .where(eq(courses.userId, userId));

    const slots = result.map(row => row.scheduleSlots);

    return slots;
}