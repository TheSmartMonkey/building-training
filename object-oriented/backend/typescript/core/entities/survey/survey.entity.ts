import { UUIDValue } from '../../values/uuid.value';
import { SurveyQuestionEntity } from './survey-question.entity';

export class SurveyEntity {
  private readonly id: UUIDValue;
  private readonly title: string;
  private readonly description: string;
  private readonly questions: SurveyQuestionEntity[];
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(title: string, description: string, questions: SurveyQuestionEntity[], id?: UUIDValue) {
    this.id = id ?? new UUIDValue();
    this.title = title;
    this.description = description;
    this.questions = questions;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  getId(): UUIDValue {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getQuestions(): SurveyQuestionEntity[] {
    return [...this.questions];
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  validate(): boolean {
    if (!this.title || !this.description) {
      return false;
    }
    if (this.questions.length === 0) {
      return false;
    }
    return this.questions.every((question) => question.validate());
  }
}
