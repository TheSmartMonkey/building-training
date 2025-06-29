import { UUIDValue } from '../../values/uuid.value';
import { QuizEntity } from './quiz.entity';

interface Answer {
  questionId: string;
  value: string;
}

export class QuizResponseEntity {
  private readonly id: UUIDValue;
  private readonly quizId: UUIDValue;
  private readonly userId: UUIDValue;
  private readonly answers: Answer[];
  private readonly score?: number;
  private readonly submittedAt: Date;

  constructor(quizId: UUIDValue, userId: UUIDValue, answers: Answer[], score?: number, id?: UUIDValue) {
    this.id = id ?? new UUIDValue();
    this.quizId = quizId;
    this.userId = userId;
    this.answers = answers;
    this.score = score;
    this.submittedAt = new Date();
  }

  getId(): UUIDValue {
    return this.id;
  }

  getQuizId(): UUIDValue {
    return this.quizId;
  }

  getUserId(): UUIDValue {
    return this.userId;
  }

  getAnswers(): Answer[] {
    return [...this.answers];
  }

  getScore(): number | undefined {
    return this.score;
  }

  getSubmittedAt(): Date {
    return this.submittedAt;
  }

  validate(quiz: QuizEntity): boolean {
    if (!this.quizId || !this.userId) {
      return false;
    }

    const quizQuestions = quiz.getQuestions();
    const requiredQuestions = quizQuestions.filter((q) => q.required);

    // Check if all required questions are answered
    const answeredQuestionIds = new Set(this.answers.map((a) => a.questionId));
    const allRequiredAnswered = requiredQuestions.every((q) => answeredQuestionIds.has(q.getId()));

    if (!allRequiredAnswered) {
      return false;
    }

    // Check if all answers correspond to valid questions
    const validQuestionIds = new Set(quizQuestions.map((q) => q.getId()));
    const allAnswersValid = this.answers.every((a) => validQuestionIds.has(a.questionId));

    return allAnswersValid;
  }
}
