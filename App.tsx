import React from "react";
import { Center, NativeBaseProvider } from "native-base";
import DailyScoreFormScreen from "./src/screens/DailyScoreFormScreen";

export default function App() {
  return (
    <NativeBaseProvider>
      <Center px={4} flex={1}>
        <DailyScoreFormScreen />
      </Center>
    </NativeBaseProvider>
  );
}
