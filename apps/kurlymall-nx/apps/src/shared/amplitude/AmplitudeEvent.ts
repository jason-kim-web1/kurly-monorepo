export class AmplitudeEvent<T> {
  name: string;

  payload: T;

  constructor(name: string, payload: T) {
    this.name = name;
    this.payload = payload;
  }

  getName() {
    return this.name;
  }

  getPayload(): any {
    return this.payload;
  }
}
