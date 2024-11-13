export class GoBackError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GoBackError';
  }
}
