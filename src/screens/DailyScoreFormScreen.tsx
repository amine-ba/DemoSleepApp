import React, { useLayoutEffect, useState } from "react";
import { useMutate } from "../api";
import DropDownSelect from "../components/DropDownSelect";
import { DurationSelectOptions } from "../consts";

import {
  CheckIcon,
  Box,
  Button,
  VStack,
  Heading,
  FormControl,
  WarningOutlineIcon,
} from "native-base";
import DisplayScoreScreen from "./DisplayScoreScreen";
import calculateScore from "../utils/calculateScore";

export const DailyScoreFormScreen = () => {
  const [durationInBed, setDurationInBed] = useState<string>("");
  const [durationAsleep, setDurationAsleep] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const [score, setScore] = useState<number | null>();

  const { mutate, response, status, error } = useMutate();

  const reset = () => {
    setDurationInBed("");
    setDurationAsleep("");
    setScore(null);
    setErrorMessage(null);
  };

  const isValid = () => {
    return durationInBed !== "" && durationAsleep !== "";
  };

  const onSubmit = () => {
    mutate(
      "localhost:8080/save/score",
      calculateScore(durationInBed, durationAsleep)
    );
  };

  useLayoutEffect(() => {
    if (status === "loading" || status === "initial") return;

    if (status === "success") {
      setScore(response?.score);
    } else {
      setErrorMessage(error);
    }
  }, [status]);

  if (score) return <DisplayScoreScreen reset={reset} score={score} />;

  return (
    <Box safeAreaTop w={"80%"} h={"60%"}>
      <VStack space={12}>
        <Heading mb="2" size="md">
          How Well You Slept ?
        </Heading>

        <VStack space={7}>
          <DropDownSelect
            value={durationInBed}
            items={DurationSelectOptions}
            onValueChange={(value: string) => {
              if(errorMessage) setErrorMessage(null);
              setDurationInBed(value);
            }}
            title="How long did you stay in bed ?"
            placeholder="Duration in bed"
            validate={(value: string) => {
              if (
                value &&
                durationAsleep &&
                Number(value) <= Number(durationAsleep)
              )
                return "duration in bed should be grater than Duration asleep";
              return null;
            }}
          />
          <DropDownSelect
            value={durationAsleep}
            items={DurationSelectOptions}
            onValueChange={(value: string) => {
              if(errorMessage) setErrorMessage(null);
              setDurationAsleep(value);
            }}
            title="How long did you sleep ?"
            placeholder="Duration asleep"
            validate={(value: string) => {
              if (
                value &&
                durationInBed &&
                Number(value) >= Number(durationInBed)
              )
                return "Duration asleep should be grater than duration in bed";
              return null;
            }}
          />

          <FormControl isInvalid={!!errorMessage}>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {errorMessage}
            </FormControl.ErrorMessage>
          </FormControl>
        </VStack>

        <Box>
          <Button
            isLoading={status === "loading"}
            mt={8}
            endIcon={<CheckIcon size="3" />}
            isDisabled={!isValid()}
            colorScheme={"green"}
            onPress={onSubmit}
          >
            Submit
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default DailyScoreFormScreen;
