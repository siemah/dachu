export interface RequestConfigTypes {
  url: string;
  requestConfig?: RequestInit | undefined;
};

export interface ResponseConfigTypes {
  code: string;
  errors: Record<string, any>;
};

/**
 * Send requests 2external services and handle response by
 * assigning a defailt error response in case the request fails
 * @param config request config such as url and fetch options @see https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters
 * @param responseConfig response config such as default error
 * @returns response from third party(wordpress api)
 */
export default async function httpRequest<Response = any>(config: RequestConfigTypes, responseConfig?: ResponseConfigTypes | undefined) {
  let response;

  try {
    const request = await fetch(config.url, config.requestConfig);
    response = await request.json();
  } catch (error) {
    let _error = error as Error;
    const customErrorResponse: Record<string, any> = {
      code: "failed",
      status: 400,
      errors: {
        global: _error?.message
      }
    };
    customErrorResponse.errors = _error?.name === "AbortError"
      ? null
      : customErrorResponse.errors;
    response = responseConfig ?? customErrorResponse;
  }

  return response as Response;
}