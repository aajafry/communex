import { AxiosError } from "axios";

export const handleError = (error: unknown, defaultMessage: string): string => {
  return (
    (error as AxiosError<{ message?: string }>)?.response?.data?.message ||
    (error as AxiosError | Error)?.message ||
    defaultMessage
  );
};
