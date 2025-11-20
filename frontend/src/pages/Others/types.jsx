// Activity and LessonPlan structure (JSX version without TypeScript)

export const createActivity = (id, name, description, duration, type) => ({
  id,
  name,
  description,
  duration,
  type, // 'lecture' | 'discussion' | 'practical' | 'assessment' | 'break'
})

export const createLessonPlan = (
  id,
  title,
  subject,
  grade,
  date,
  duration,
  objectives,
  materials,
  activities,
  assessment,
  homework,
  notes,
  status,
  createdAt,
  updatedAt
) => ({
  id,
  title,
  subject,
  grade,
  date,
  duration,
  objectives,
  materials,
  activities, // array of Activity objects
  assessment,
  homework,
  notes,
  status, // 'draft' | 'approved' | 'completed'
  createdAt,
  updatedAt,
})
