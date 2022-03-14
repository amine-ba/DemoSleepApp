import React from "react";
import { Button, Heading, Progress, Text, VStack } from "native-base";

import theme from "@shared/theme";
import { FormContainer, SpacingContainer } from "@shared/styles";

import { locals } from "@consts";

export const DisplayScoreScreen = ({
  score,
  reset,
}: DailyScoreScreenProps) => {
  return (
    <FormContainer safeAreaTop>
      <VStack space={12}>
        <Heading>{locals.scoreScreen.title}</Heading>

        <VStack space={7}>
          <Text fontSize="5xl" alignSelf={"center"}>
            {score} %
          </Text>
          <Progress size="2xl" value={score} />
        </VStack>

        <SpacingContainer mTop={20}>
          <Button
            colorScheme={theme.colors.primary.red}
            color={theme.colors.primary.red300}
            variant="subtle"
            onPress={reset}
          >
            {locals.reset}
          </Button>
        </SpacingContainer>
      </VStack>
    </FormContainer>
  );
};

export interface DailyScoreScreenProps {
  reset: () => void;
  score: number;
}

export default DisplayScoreScreen;
