import React from "react";
import { Box, Button, Heading, Progress, Text, VStack } from "native-base";

export interface DailyScoreScreenPropsType {
  reset: () => void;
  score: number;
}

export const DisplayScoreScreen = ({
  score,
  reset,
}: DailyScoreScreenPropsType) => {
  return (
    <Box safeAreaTop w={"80%"} h={"60%"}>
      <VStack space={12}>
        <Heading mb="2" size="md">
          Your Score is
        </Heading>

        <VStack space={7}>
          <Text fontSize="5xl" alignSelf={"center"}>
            {Math.round(score)} %
          </Text>
          <Progress size="2xl" mb={4} value={Math.round(score)} />
        </VStack>

        <Box>
          <Button
            mt="3"
            colorScheme={"red"}
            color={"red.300"}
            variant="subtle"
            onPress={reset}
          >
            Reset
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default DisplayScoreScreen;
