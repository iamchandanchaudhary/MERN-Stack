export const DEPARTMENT_OPTIONS = [
  { value: "computer_science", label: "Computer Science" },
  { value: "mathematics", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "commerce", label: "Commerce" },
  { value: "humanities", label: "Humanities" },
];

export const SUBJECT_OPTIONS = [
  { value: "data_structures", label: "Data Structures" },
  { value: "algorithms", label: "Algorithms" },
  { value: "database_systems", label: "Database Systems" },
  { value: "operating_systems", label: "Operating Systems" },
  { value: "machine_learning", label: "Machine Learning" },
  { value: "calculus", label: "Calculus" },
  { value: "statistics", label: "Statistics" },
  { value: "physics_lab", label: "Physics Lab" },
  { value: "chemistry_lab", label: "Chemistry Lab" },
  { value: "english_communication", label: "English Communication" },
];

export const DEPARTMENT_LABEL_BY_VALUE = DEPARTMENT_OPTIONS.reduce(
  (accumulator, option) => ({
    ...accumulator,
    [option.value]: option.label,
  }),
  {},
);

export const SUBJECT_LABEL_BY_VALUE = SUBJECT_OPTIONS.reduce(
  (accumulator, option) => ({
    ...accumulator,
    [option.value]: option.label,
  }),
  {},
);
