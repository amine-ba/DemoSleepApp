import { useState } from "react";
import { mockedAxios } from "./axios";

declare type RequestStatus = "initial" | "loading" | "success" | "error";

export const useMutate = () => {
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState();
  const [status, setStatus] = useState<RequestStatus>("initial");

  const mutate = async (url: string, payload: any) => {
    setStatus("loading");
    setError(undefined);
    try {
      const result = await mockedAxios["post"](url, payload);
      setResponse(result?.data);
      setStatus("success");
    } catch (error: any) {
      setError(error);
      setStatus("error");
    }
  };

  return {
    mutate,
    response,
    status,
    error,
  };
};
