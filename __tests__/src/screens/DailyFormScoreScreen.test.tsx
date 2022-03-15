import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import DailyScoreFormScreen from "@screens/DailyScoreFormScreen";

import { NativeBaseProvider } from "native-base";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const TestComponent = () => (
  <NativeBaseProvider initialWindowMetrics={inset}>
    <DailyScoreFormScreen />
  </NativeBaseProvider>
);

const MockMutate = jest.fn();
const MockedScore = 70;

jest.mock("../../../src/hooks/useScore/index.ts", () => ({
  useScore: (_props: any) => MockedScore,
}));

jest.mock("../../../src/hooks/useMutate/index.ts", () => ({
  ...jest.requireActual("../../../src/hooks/useMutate/index.ts"),
  useMutate: () => ({
    mutate: MockMutate,
    status: "finished",
    error: null,
  }),
}));

describe(" <DailyScoreFormScreen /> Component ", () => {
  it(" Should Successfully Rendred ", () => {
    const json = render(<TestComponent />).toJSON();

    expect(json).toMatchSnapshot();
  });

  it(" Should Save the correct Score ", async () => {
    const { findByTestId } = render(<TestComponent />);

    const submitButtonNode = await findByTestId("save.score.button");

    fireEvent.press(submitButtonNode);

    expect(MockMutate).toBeCalledWith("localhost:8080/scores", MockedScore);

  });
});
