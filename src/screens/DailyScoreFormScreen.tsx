import React, { useLayoutEffect, useState } from "react";

import {
  CheckIcon,
  Button,
  VStack,
  Heading,
  FormControl,
  WarningOutlineIcon,
} from "native-base";

import theme from "@shared/theme";
import { FormContainer, SpacingContainer } from "@shared/styles";

import DropDownSelect from "@components/DropDownSelect";
import DisplayScoreScreen from "@screens/DisplayScoreScreen";

import { RequestStatus, useMutate } from "@api";

import { locals, DurationSelectOptions } from "@consts";

import calculateScore from "@utils/calculateScore";


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
      !!durationInBed &&
      !!durationAsleep &&
      Number(durationInBed) > Number(durationAsleep)
    );
  };

  const onSubmit = () => {
    mutate(
      "localhost:8080/save/score",
      calculateScore(durationInBed, durationAsleep)
    );
  };

  const validate = () => {
    return !durationAsleep || !durationInBed || isValid();
  };

  useLayoutEffect(() => {
    if (status === RequestStatus.initial || status === RequestStatus.loading)
      return;

    if (status === RequestStatus.success) {
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
          validate={() => {
            if (validate()) return null;
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
          validate={() => {
            if (validate()) return null;
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
          isLoading={status === RequestStatus.loading}
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
