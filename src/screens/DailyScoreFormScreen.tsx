import React, { useCallback, useLayoutEffect, useState } from "react";

import {
  CheckIcon,
  Button,
  Heading,
  FormControl,
  WarningOutlineIcon,
} from "native-base";

import theme from "@shared/theme";
import { FormContainer, SpacingContainer } from "@shared/styles";

import DropDownSelect from "@components/DropDownSelect";
import DisplayScoreScreen from "@screens/DisplayScoreScreen";

import { RequestStatus, useMutate } from "@api";

import { TextContent, DurationSelectOptions } from "@consts";

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

  const canSubmit = () => {
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

  const validate = useCallback(() => {
    return !durationAsleep || !durationInBed || canSubmit();
  }, [durationAsleep, durationInBed]);

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
      <SpacingContainer mBottom={50}>
        <Heading>{TextContent.scoreForm.title}</Heading>
      </SpacingContainer>

      <SpacingContainer mVertical={30}>
        <DropDownSelect
          value={durationInBed}
          items={DurationSelectOptions}
          onValueChange={(value: string) => {
            if (errorMessage) setErrorMessage(null);
            setDurationInBed(value);
          }}
          title={TextContent.scoreForm.durationInBed.title}
          placeholder={TextContent.scoreForm.durationInBed.placeholder}
          validate={() => {
            if (validate()) return null;
            else return TextContent.scoreForm.durationInBed.error;
          }}
        />
      </SpacingContainer>

      <DropDownSelect
        value={durationAsleep}
        items={DurationSelectOptions}
        onValueChange={(value: string) => {
          if (errorMessage) setErrorMessage(null);
          setDurationAsleep(value);
        }}
        title={TextContent.scoreForm.durationAsleep.title}
        placeholder={TextContent.scoreForm.durationAsleep.placeholder}
        validate={() => {
          if (validate()) return null;
          else return TextContent.scoreForm.durationAsleep.error;
        }}
      />

      <SpacingContainer mVertical={20}>
        <FormControl isInvalid={!!errorMessage}>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {errorMessage}
          </FormControl.ErrorMessage>
        </FormControl>
      </SpacingContainer>

      <SpacingContainer mTop={60}>
        <Button
          testID='score-form-submit-button'
          isLoading={status === RequestStatus.loading}
          endIcon={<CheckIcon size="xs" />}
          isDisabled={!canSubmit()}
          colorScheme={theme.colors.primary.green}
          onPress={onSubmit}
        >
          {TextContent.submit}
        </Button>
      </SpacingContainer>
    </FormContainer>
  );
};

export default DailyScoreFormScreen;
