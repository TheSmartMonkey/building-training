import { QuestionValue } from '../../values/questions/question.value';
import { UUIDValue } from '../../values/uuid.value';

export interface IQuestion {
  id: UUIDValue;
  type: QuestionValue;
  text: string;
  required: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Base abstract class for questions that implements common functionality
export abstract class BaseQuestion implements IQuestion {
  readonly id: UUIDValue;
  readonly type: QuestionValue;
  readonly text: string;
  readonly required: boolean;
  readonly order: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(id: UUIDValue, type: QuestionValue, text: string, required: boolean, order: number) {
    this.id = id;
    this.type = type;
    this.text = text;
    this.required = required;
    this.order = order;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  abstract validate(): boolean;
}
