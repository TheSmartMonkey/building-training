export class SurveyEntity {
  constructor(private readonly _value: Survey) {}

  public get value(): Survey {
    return this._value;
  }
}

type Survey = {};
