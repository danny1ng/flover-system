declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';
declare module '*.svg?original';
declare module '*.ico';
declare module '*.woff';
declare module '*.woff2';
declare module '*.ttf';

declare namespace React {
  interface DOMAttributes<T> {
    css?: any;
  }
}

type ID = string | number;

interface APIResponse<T, M = {}> {
  payload: T;
  meta?: M;
}

interface APIListResponse<T, M = {}> {
  payload: T[];
  meta: {
    totalPages: number;
    totalCount: number;
  } & M;
}

interface APIError {
  errors: Record<string, any>;
  message: string;
  statusCode: number;
}
