import React from "react";
import { render } from "@testing-library/react-native";

import DailyFormScoreScreen from "@screens/DailyScoreFormScreen";
import { NativeBaseProvider } from "native-base";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

describe(" <App /> Component ", () => {

  it(" should successfully rendred ", () => {
    const { debug, getByTestId } = render(
      <NativeBaseProvider initialWindowMetrics={inset}>
        <DailyFormScoreScreen />
      </NativeBaseProvider>
    );

    const button = getByTestId("score-form-submit-button");

    expect(button).toBeDefined();
  });

  
});
