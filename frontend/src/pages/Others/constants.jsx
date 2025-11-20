// Tailwind-friendly constants for Teacher Dashboard

export const SUBJECTS = [
  "all",
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "English",
]

export const WEEKS = ["current", "next", "previous"]

export const ACTIVITY_TYPES = ["lecture", "discussion", "practical", "assessment", "break"]

export const STATUS_COLORS = {
  draft: "bg-yellow-100 text-yellow-800 border-yellow-200",
  approved: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
}

export const ACTIVITY_TYPE_COLORS = {
  lecture: "bg-blue-100 text-blue-800",
  discussion: "bg-green-100 text-green-800",
  practical: "bg-purple-100 text-purple-800",
  assessment: "bg-red-100 text-red-800",
  break: "bg-gray-100 text-gray-800",
}
