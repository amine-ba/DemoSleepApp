import React from "react";
import { Button, Heading, Progress, Text } from "native-base";

import theme from "@shared/theme";
import { FormContainer, SpacingContainer } from "@shared/styles";

import { TextContent } from "@consts";

export const DisplayScoreScreen = ({ score, reset }: DailyScoreScreenProps) => {
  return (
    <FormContainer safeAreaTop>
      <SpacingContainer mVertical={50}>
        <Heading>{TextContent.scoreScreen.title}</Heading>
      </SpacingContainer>

      <Text fontSize="5xl" alignSelf={"center"} testID="display.score">
        {score} %
      </Text>
      <Progress size="2xl" value={score} />

      <SpacingContainer mTop={50}>
        <Button
          testID="reset.score.botton"
          colorScheme={theme.colors.primary.red}
          color={theme.colors.primary.red300}
          variant="subtle"
          onPress={reset}
        >
          {TextContent.reset}
        </Button>
      </SpacingContainer>
    </FormContainer>
  );
};

export interface DailyScoreScreenProps {
  reset: () => void;
  score: number;
}

export default DisplayScoreScreen;
