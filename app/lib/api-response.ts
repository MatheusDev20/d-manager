/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/apiResponse.ts

export type ApiResponse<T = any> = {
  status: number;
  message: string;
  data: T | null;
};

/**
 * Wraps the provided data in a standard response object.
 * @param data - The payload to return.
 * @param message - A human-readable message.
 * @param statusCode - The HTTP status code.
 */
export function ok<T>(
  data: T,
  message: string = "Operation successful",
  statusCode: number = 200,
): Response {
  const responseBody: ApiResponse<T> = {
    status: statusCode,
    message,
    data,
  };

  return new Response(JSON.stringify(responseBody), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Returns a standardized error response.
 * @param message - An error message.
 * @param statusCode - The HTTP status code.
 */
export function failed(
  message: string = "Something went wrong",
  statusCode: number = 500,
): Response {
  const responseBody: ApiResponse = {
    status: statusCode,
    message,
    data: null,
  };

  return new Response(JSON.stringify(responseBody), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Higher-order function that wraps a route handler to catch errors.
 * @param handler - Your async route handler function.
 */
export function withErrorHandling(
  handler: (request: Request) => Promise<Response>,
): (request: Request) => Promise<Response> {
  return async (request: Request): Promise<Response> => {
    try {
      return await handler(request);
    } catch (error) {
      console.error("Handler error:", error);
      return failed("Internal Server Error", 500);
    }
  };
}
