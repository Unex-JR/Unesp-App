import { db } from "@/db";
import { assessments, type Assessment, type NewAssessment } from "@/db/schema/assessments";
import { eq } from "drizzle-orm";

export async function createAssessment(data: NewAssessment): Promise<Assessment> {
    const [created] = await db.insert(assessments).values(data).returning();
    return created;
}

export async function editAssessment(
    id: number,
    data: Partial<NewAssessment>,
): Promise<Assessment> {
    const [updated] = await db
        .update(assessments)
        .set(data)
        .where(eq(assessments.id, id))
        .returning();

    return updated;
}

export async function deleteAssessment(id: number): Promise<void> {
    await db.delete(assessments).where(eq(assessments.id, id));
}

export async function getAssessmentsByCourse(courseId: number): Promise<Assessment[]> {
    return db.query.assessments.findMany({ where: eq(assessments.courseId, courseId) });
}
