import React from "react";
import { Center, HStack, NativeBaseProvider, Spinner } from "native-base";

export const Loading = () => {
  return (
    <NativeBaseProvider>
      <Center
        // _dark={{ bg: "blueGray.900" }}
        // _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
      >
        <HStack space={8} justifyContent="center" alignItems="center">
          <Spinner size="lg" />
        </HStack>
      </Center>
    </NativeBaseProvider>
  );
};

export default Loading;
