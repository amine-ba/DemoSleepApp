import { useState } from "react";
import { mockedAxios } from "@api/axios";

export enum RequestStatus {
  initial = "initial",
  loading = "loading",
  success = "success",
  error = "error",
}

export const useMutate = () => {
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState();
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.initial);

  const mutate = async (url: string, payload: any) => {
    setStatus(RequestStatus.loading);
    setError(undefined);
    try {
      const result = await mockedAxios["post"](url, payload);
      setResponse(result?.data);
      setStatus(RequestStatus.success);
    } catch (error: any) {
      setError(error);
      setStatus(RequestStatus.error);
    }
  };

  return {
    mutate,
    response,
    status,
    error,
  };
};
