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

import { RequestStatus, useMutate } from "hooks/useMutate";

import { TextContent, DurationSelectOptions } from "@consts";
import { useScore } from "hooks/useScore";

export const DailyScoreFormScreen = () => {
  const [durationInBed, setDurationInBed] = useState<string>("");
  const [durationAsleep, setDurationAsleep] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const [displayScore, setDisplayScore] = useState<boolean>(false);

  const score = useScore({ durationInBed, durationAsleep });

  const { mutate, status, error } = useMutate();

  useLayoutEffect(() => {
    if (status === RequestStatus.initial || status === RequestStatus.loading)
      return;

    if (status === RequestStatus.success) {
      setDisplayScore(true);
    } else {
      setErrorMessage(error);
    }
  }, [status]);

  const reset = () => {
    setDurationInBed("");
    setDurationAsleep("");
    setErrorMessage(null);
    setDisplayScore(false);
  };

  const canSubmit = () => {
    return (
      !!durationInBed &&
      !!durationAsleep &&
      Number(durationInBed) > Number(durationAsleep)
    );
  };

  const onSubmit = () => {
    mutate("localhost:8080/scores", score);
  };

  const validate = useCallback(() => {
    return !durationAsleep || !durationInBed || canSubmit();
  }, [durationAsleep, durationInBed]);

  const onDurationInBedChange = useCallback((value: string) => {
    if (errorMessage) setErrorMessage(null);
    setDurationInBed(value);
  }, []);

  const onDurationAsleepChange = useCallback((value: string) => {
    if (errorMessage) setErrorMessage(null);
    setDurationAsleep(value);
  }, []);

  if (displayScore && score)
    return <DisplayScoreScreen reset={reset} score={score} />;

  return (
    <FormContainer safeAreaTop>
      <SpacingContainer mBottom={50}>
        <Heading>{TextContent.scoreForm.title}</Heading>
      </SpacingContainer>

      <SpacingContainer mVertical={30}>
        <DropDownSelect
          testID="durationInBedSelect"
          value={durationInBed}
          items={DurationSelectOptions}
          onValueChange={onDurationInBedChange}
          title={TextContent.scoreForm.durationInBed.title}
          placeholder={TextContent.scoreForm.durationInBed.placeholder}
          validate={() => {
            if (validate()) return null;
            else return TextContent.scoreForm.durationInBed.error;
          }}
        />
      </SpacingContainer>

      <DropDownSelect
        testID="durationAsleepSelect"
        value={durationAsleep}
        items={DurationSelectOptions}
        onValueChange={onDurationAsleepChange}
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
          testID="save-score-button"
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
