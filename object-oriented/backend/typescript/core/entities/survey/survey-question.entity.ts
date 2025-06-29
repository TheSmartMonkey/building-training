import { QuestionValue } from '../../values/questions/question.value';
import { UUIDValue } from '../../values/uuid.value';
import { BaseQuestion } from '../shared/iquestion';

export class SurveyQuestionEntity extends BaseQuestion {
  private readonly options?: string[];

  constructor(id: UUIDValue, type: QuestionValue, text: string, required: boolean, order: number, options?: string[]) {
    super(id, type, text, required, order);
    this.options = options;
  }

  validate(): boolean {
    if (this.type === QuestionValue.SINGLE) {
      if (!this.options || this.options.length === 0) {
        return false;
      }
    }
    return true;
  }

  getOptions(): string[] | undefined {
    return this.options;
  }
}
