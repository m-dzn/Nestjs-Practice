export interface ErrorResponse {
  error?: string;
  message?: string | string[];
}

export interface ResponseEntity extends ErrorResponse {
  success: boolean;
  status: number;
  data?: any;
}
