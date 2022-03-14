import styled from "styled-components";

import { Box, View } from "native-base";
import { generateMargins } from "@utils/generateMargins";

export const FlexContainer = styled(Box)``;

export const FormContainer = styled(FlexContainer)`
  width: 80%;
  height: 60%;
`;

export interface SpacingContainerProps {
  mLeft?: number;
  mRight?: number;
  mTop?: number;
  mBottom?: number;
  mVertical?: number;
  mHorizontal?: number;
  mAll?: number;
}

export const SpacingContainer = styled(View)<SpacingContainerProps>`
  ${(props: SpacingContainerProps) => generateMargins(props)};
`;
