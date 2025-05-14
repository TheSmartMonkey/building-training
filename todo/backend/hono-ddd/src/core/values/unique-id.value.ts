import { randomUUID, UUID } from 'crypto';

export class UniqueIdValue {
  constructor(private readonly _value: UUID | string = randomUUID()) {}

  get value(): UUID | string {
    return this._value;
  }
}
