import { SpacingContainerProps } from "@shared/styles";

export const generateMargins = (props: SpacingContainerProps) => {
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
