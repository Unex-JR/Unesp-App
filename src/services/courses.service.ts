import { CourseDetails } from "@/components/CoursesScreen/CourseDetailsModal";
import { getAbsencesByCourse } from "@/repositories/absences.repository";
import { getCourseById } from "@/repositories/courses.repository";

export async function structureCourseDetails(
  id: number,
): Promise<CourseDetails> {
  const courseInfo = await getCourseById(id);
  if (courseInfo == undefined) {
    throw new Error("Erro, curso não encontrado");
  }
  const absencesInfo = await getAbsencesByCourse(courseInfo.id);

  const frequency = Math.floor(
    ((courseInfo.creditHours - 2 * absencesInfo[courseInfo.id].count) /
      courseInfo.creditHours) *
      100,
  );

  const courseDetails: CourseDetails = {
    id: courseInfo.id,
    name: courseInfo.name,
    professor: courseInfo.professor,
    code: courseInfo.code,
    local: courseInfo.local,
    frequency: frequency,
  };

  return courseDetails;
}
