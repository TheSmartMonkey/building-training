import { randomUUID, UUID } from 'crypto';

export class UniqueIdValue {
  private _value: UUID;

  constructor(value?: UUID) {
    this._value = value ?? this.random();
  }

  get value(): string {
    return this._value;
  }

  private random(): UUID {
    return randomUUID();
  }
}
