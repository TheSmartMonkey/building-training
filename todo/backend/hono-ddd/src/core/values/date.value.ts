export class DateValue {
  constructor(private readonly _value: Date = new Date()) {}

  get value(): Date {
    return this._value;
  }
}
