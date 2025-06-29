export enum QuestionValue {
  TEXT = 'text',
  SINGLE = 'single',
}

// Mapping between Quiz and Survey question types
export const QuestionValueMapping = {
  // Quiz to Survey mapping
  textQuestion: QuestionValue.TEXT,
  singleQuestion: QuestionValue.SINGLE,

  // Survey to Quiz mapping
  text: QuestionValue.TEXT,
  single: QuestionValue.SINGLE,
} as const;

// Type guard to check if a string is a valid question type
export function isValidQuestionValue(value: string): value is QuestionValue {
  return Object.values(QuestionValue).includes(value as QuestionValue);
}
