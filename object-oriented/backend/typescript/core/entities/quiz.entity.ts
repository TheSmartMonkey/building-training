export class QuizEntity {
  constructor(private readonly _value: Quiz) {}

  public get value(): Quiz {
    return this._value;
  }
}

type Quiz = {};
