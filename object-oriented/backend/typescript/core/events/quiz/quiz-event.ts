import { QuizResponseEntity } from '../../entities/quiz/quiz-response.entity';
import { QuizEntity } from '../../entities/quiz/quiz.entity';
import { IDomainEvent } from '../../events/idomain-event';
import { UUIDValue } from '../../values/uuid.value';

export class QuizCreatedEvent implements IDomainEvent {
  readonly eventId: UUIDValue;
  readonly occurredOn: Date;
  readonly eventType: string;
  readonly quiz: QuizEntity;

  constructor(quiz: QuizEntity) {
    this.eventId = new UUIDValue();
    this.occurredOn = new Date();
    this.eventType = 'QuizCreatedEvent';
    this.quiz = quiz;
  }
}

export class QuizResponseSubmittedEvent implements IDomainEvent {
  readonly eventId: UUIDValue;
  readonly occurredOn: Date;
  readonly eventType: string;
  readonly response: QuizResponseEntity;

  constructor(response: QuizResponseEntity) {
    this.eventId = new UUIDValue();
    this.occurredOn = new Date();
    this.eventType = 'QuizResponseSubmittedEvent';
    this.response = response;
  }
}
