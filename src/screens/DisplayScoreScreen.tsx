import React from "react";
import { Button, Heading, Progress, Text, VStack } from "native-base";
import { FormContainer, SpacingContainer } from "@shared/styles";

import { locals } from "@consts";
import theme from "@shared/theme";

export interface DailyScoreScreenPropsType {
  reset: () => void;
  score: number;
}

export const DisplayScoreScreen = ({
  score,
  reset,
}: DailyScoreScreenPropsType) => {
  return (
    <FormContainer safeAreaTop>
      <VStack space={12}>
        <Heading>{locals["screen.score.title"]}</Heading>

        <VStack space={7}>
          <Text fontSize="5xl" alignSelf={"center"}>
            {Math.round(score)} %
          </Text>
          <Progress size="2xl" value={Math.round(score)} />
        </VStack>

        <SpacingContainer mTop={20}>
          <Button
            colorScheme={theme.colors.primary.red}
            color={theme.colors.primary.red300}
            variant="subtle"
            onPress={reset}
          >
            {locals["form.reset"]}
          </Button>
        </SpacingContainer>
      </VStack>
    </FormContainer>
  );
};

export default DisplayScoreScreen;
