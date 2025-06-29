import { QuestionValue } from '../../values/questions/question.value';
import { BaseQuestion } from '../shared/iquestion';

export class QuizQuestionEntity extends BaseQuestion {
  private readonly options?: string[];
  private readonly correctAnswer?: string;

  constructor(id: string, type: QuestionValue, text: string, required: boolean, order: number, options?: string[], correctAnswer?: string) {
    super(id, type, text, required, order);
    this.options = options;
    this.correctAnswer = correctAnswer;
  }

  validate(): boolean {
    if (this.type === QuestionValue.SINGLE) {
      if (!this.options || this.options.length === 0) {
        return false;
      }
      if (!this.correctAnswer || !this.options.includes(this.correctAnswer)) {
        return false;
      }
    }
    return true;
  }

  getOptions(): string[] | undefined {
    return this.options;
  }

  getCorrectAnswer(): string | undefined {
    return this.correctAnswer;
  }
}
