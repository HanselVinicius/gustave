export class AppResponse<T> {
  private constructor(
    public readonly data: T,
    public readonly meta?: any
  ) {}

  public static build<T>(data: T, meta?: any): AppResponse<T> {
    return new AppResponse(data, meta);
  }

  public toJson() {
    return {
      data: this.data,
      meta: this.meta
    };
  }
}
