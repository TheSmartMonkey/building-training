import { EnvVariables } from '@/models/global/env.model';

export class EnvManager {
  private static _value: EnvVariables;

  private constructor() {}

  public static get value(): EnvVariables {
    return EnvManager._value;
  }

  public static set value(env: EnvVariables) {
    EnvManager._value = env;
  }
}
