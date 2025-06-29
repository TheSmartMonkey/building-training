import { randomUUID, UUID } from 'crypto';

export class UUIDValue {
  constructor(private readonly _value: UUID = this.random()) {}

  get value(): string {
    return this._value;
  }

  private random(): UUID {
    return randomUUID();
  }
}
