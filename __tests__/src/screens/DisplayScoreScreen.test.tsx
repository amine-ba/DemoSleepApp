import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import DisplayScoreScreen, {
  DailyScoreScreenProps,
} from "@screens/DisplayScoreScreen";
import { NativeBaseProvider } from "native-base";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

const Mockrest = jest.fn();
let testScore = 1;

const TestComponent = (props: DailyScoreScreenProps) => (
  <NativeBaseProvider initialWindowMetrics={inset}>
    <DisplayScoreScreen {...props} />
  </NativeBaseProvider>
);

describe(" <DisplayScoreScreen /> Component ", () => {
  it(" Should Successfully Rendred ", () => {
    const json = render(<TestComponent score={1} reset={Mockrest} />).toJSON();

    expect(json).toMatchSnapshot();
  });

  it(" Should Display the exact Score ", async () => {
    const { findByTestId } = render(
      <TestComponent score={1} reset={Mockrest} />
    );

    const displayChild = await findByTestId("display.score");

    expect(displayChild?.props?.children?.join("")).toEqual(`${testScore} %`);
  });

  it(" Should Call Reset ", async () => {
    const { findByTestId } = render(
      <TestComponent score={1} reset={Mockrest} />
    );

    const resetButtonNode = await findByTestId("reset.score.botton");

    fireEvent.press(resetButtonNode);

    // only once
    expect(Mockrest).toBeCalledTimes(1);
  });
});
