import { useLayoutEffect, useState } from "react";

export interface useScoreProps {
  durationInBed: string;
  durationAsleep: string;
}

export const useScore = ({ durationInBed, durationAsleep }: useScoreProps) => {
  const [score, setScore] = useState<number | null>();

  useLayoutEffect(() => {
    if (!durationInBed || !durationAsleep) {
      setScore(null);
    } else {
      const percentage = Math.round(
        (100 * Number(durationAsleep)) / Number(durationInBed)
      );

      setScore(percentage);
    }
  }, [durationInBed, durationAsleep]);

  return score;
};
