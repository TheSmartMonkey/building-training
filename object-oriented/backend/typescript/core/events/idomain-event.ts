import { UUIDValue } from '../values/uuid.value';

export interface IDomainEvent {
  readonly eventId: UUIDValue;
  readonly occurredOn: Date;
  readonly eventType: string;
}
