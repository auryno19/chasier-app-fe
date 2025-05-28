class CustomApiError extends Error {
  constructor(
    public message: string,
    public status: number,
    public success: boolean = false,
    public errors?: Record<string, string>
  ) {
    super(message);
    this.name = "CustomApiError";
  }
}

export default CustomApiError;
