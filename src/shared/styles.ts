import styled from "styled-components";

import { Box, View } from "native-base";

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

const generateMargins = (props: SpacingContainerProps) => {
  let top = props.mTop ?? props.mVertical ?? props.mAll ?? 0;
  let bottom = props.mBottom ?? props.mVertical ?? props.mAll ?? 0;

  let left = props.mLeft ?? props.mHorizontal ?? props.mAll ?? 0;
  let right = props.mRight ?? props.mHorizontal ?? props.mAll ?? 0;

  return `
    margin-left: ${left}px;
    margin-right: ${right}px;
    margin-top: ${top}px;
    margin-bottom: ${bottom}px;
  `;
};

export const SpacingContainer = styled(View)<SpacingContainerProps>`
  ${(props: SpacingContainerProps) => generateMargins(props)};
`;
