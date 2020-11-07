export const getGlobalError = (error: any) => error?.response?.errors?.[0]?.message;
