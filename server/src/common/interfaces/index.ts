export interface ErrorResponse {
  error: string;
  statusCode: number;
  message: string | string[];
}

export interface ResponseEntity {
  success: boolean;
  code: number;
  data?: any;
}
