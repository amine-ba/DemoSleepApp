import React, { useLayoutEffect, useState } from "react";
import { useMutate } from "@api";
import DropDownSelect from "@components/DropDownSelect";
import { DurationSelectOptions } from "@consts";

import {
  CheckIcon,
  Button,
  VStack,
  Heading,
  FormControl,
  WarningOutlineIcon,
} from "native-base";

import DisplayScoreScreen from "./DisplayScoreScreen";
import calculateScore from "@utils/calculateScore";

import { locals } from "@consts";
import { FormContainer, SpacingContainer } from "@shared/styles";

import theme from "@shared/theme";

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
    return (
      durationInBed !== "" &&
      durationAsleep !== "" &&
      Number(durationInBed) > Number(durationAsleep)
    );
  };

  const onSubmit = () => {
    mutate(
      "localhost:8080/save/score",
      calculateScore(durationInBed, durationAsleep)
    );
  };

  useLayoutEffect(() => {
    if (status === "initial" || status === "loading") return;

    if (status === "success") {
      setScore(response?.score);
    } else {
      setErrorMessage(error);
    }
  }, [status]);

  if (score) return <DisplayScoreScreen reset={reset} score={score} />;

  return (
    <FormContainer safeAreaTop>
      <SpacingContainer mBottom={80}>
        <Heading>{locals["form.score.title"]}</Heading>
      </SpacingContainer>
      <VStack space={8}>
        <DropDownSelect
          value={durationInBed}
          items={DurationSelectOptions}
          onValueChange={(value: string) => {
            if (errorMessage) setErrorMessage(null);
            setDurationInBed(value);
          }}
          title={locals["form.duration_in_bed.title"]}
          placeholder={locals["form.duration_in_bed.placeholder"]}
          validate={(value: string) => {
            const isValid =
              !value ||
              !durationAsleep ||
              Number(value) > Number(durationAsleep);

            if (isValid) return null;
            else return locals["form.duration_in_bed.error"];
          }}
        />

        <DropDownSelect
          value={durationAsleep}
          items={DurationSelectOptions}
          onValueChange={(value: string) => {
            if (errorMessage) setErrorMessage(null);
            setDurationAsleep(value);
          }}
          title={locals["form.duration_asleep.title"]}
          placeholder={locals["form.duration_asleep.placeholder"]}
          validate={(value: string) => {
            const isValid =
              !value || !durationInBed || Number(value) < Number(durationInBed);

            if (isValid) return null;
            else return locals["form.duration_asleep.error"];
          }}
        />

        <FormControl isInvalid={!!errorMessage}>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errorMessage}
          </FormControl.ErrorMessage>
        </FormControl>
      </VStack>

      <SpacingContainer mTop={70}>
        <Button
          isLoading={status === "loading"}
          endIcon={<CheckIcon size="xs" />}
          isDisabled={!isValid()}
          colorScheme={theme.colors.primary.green}
          onPress={onSubmit}
        >
          {locals["form.submit"]}
        </Button>
      </SpacingContainer>
    </FormContainer>
  );
};

export default DailyScoreFormScreen;
