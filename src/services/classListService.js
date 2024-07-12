import classList from "@/data/classList"
import lessonList from "@/data/lessonList"

const getClassById = (id) => classList.find(x => x.id == id)
const getLatestLesson = (classId) => lessonList.filter(x => x.classId == classId).pop()

export default { getClassById, getLatestLesson }