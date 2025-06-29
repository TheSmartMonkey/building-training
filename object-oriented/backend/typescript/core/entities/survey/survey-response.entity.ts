import { UUIDValue } from '../../values/uuid.value';
import { SurveyEntity } from './survey.entity';

interface Answer {
  questionId: string;
  value: string;
}

export class SurveyResponseEntity {
  private readonly id: UUIDValue;
  private readonly surveyId: string;
  private readonly userId: string;
  private readonly answers: Answer[];
  private readonly submittedAt: Date;

  constructor(surveyId: string, userId: string, answers: Answer[], id?: string) {
    this.id = new UUIDValue();
    this.surveyId = surveyId;
    this.userId = userId;
    this.answers = answers;
    this.submittedAt = new Date();
  }

  getId(): UUIDValue {
    return this.id;
  }

  getSurveyId(): string {
    return this.surveyId;
  }

  getUserId(): string {
    return this.userId;
  }

  getAnswers(): Answer[] {
    return [...this.answers];
  }

  getSubmittedAt(): Date {
    return this.submittedAt;
  }

  validate(survey: SurveyEntity): boolean {
    if (!this.surveyId || !this.userId) {
      return false;
    }

    const surveyQuestions = survey.getQuestions();
    const requiredQuestions = surveyQuestions.filter((q) => q.required);

    // Check if all required questions are answered
    const answeredQuestionIds = new Set(this.answers.map((a) => a.questionId));
    const allRequiredAnswered = requiredQuestions.every((q) => answeredQuestionIds.has(q.getId()));

    if (!allRequiredAnswered) {
      return false;
    }

    // Check if all answers correspond to valid questions
    const validQuestionIds = new Set(surveyQuestions.map((q) => q.getId()));
    const allAnswersValid = this.answers.every((a) => validQuestionIds.has(a.questionId));

    return allAnswersValid;
  }
}
