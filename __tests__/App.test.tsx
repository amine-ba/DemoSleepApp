import React from "react";
import { render } from "@testing-library/react-native";

import App from "../App";

describe(" <App /> Component ", () => {
  it(" should successfully rendred ", () => {
    const appTree = render(<App />).toJSON();
    expect(appTree).toMatchSnapshot();
  });
});
