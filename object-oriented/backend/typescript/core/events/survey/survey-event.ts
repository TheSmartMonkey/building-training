import { Survey } from '../../entities/survey/Survey';
import { SurveyResponse } from '../../entities/survey/SurveyResponse';
import { UUIDValue } from '../../values/uuid.value';
import { IDomainEvent } from '../IDomainEvent';

export class SurveyCreatedEvent implements IDomainEvent {
  readonly eventId: UUIDValue;
  readonly occurredOn: Date;
  readonly eventType: string;
  readonly survey: Survey;

  constructor(survey: Survey) {
    this.eventId = new UUIDValue();
    this.occurredOn = new Date();
    this.eventType = 'SurveyCreatedEvent';
    this.survey = survey;
  }
}

export class SurveyResponseSubmittedEvent implements IDomainEvent {
  readonly eventId: UUIDValue;
  readonly occurredOn: Date;
  readonly eventType: string;
  readonly response: SurveyResponse;

  constructor(response: SurveyResponse) {
    this.eventId =  new UUIDValue();
    this.occurredOn = new Date();
    this.eventType = 'SurveyResponseSubmittedEvent';
    this.response = response;
  }
}
