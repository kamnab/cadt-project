import classList from "@/data/classList"

const getClassById = (id) => classList.find(x => x.id == id)

export default { getClassById }