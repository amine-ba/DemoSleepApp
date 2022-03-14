export const mockedAxios = {
  post: (_url: string, payload: any) => saveDailyScore(payload),
};

interface saveDailyScoreResponseType {
  data: {
    status: string;
    score: Number;
  };
}

let MockApiFailed = true;

const saveDailyScore = async (
  score: number
): Promise<saveDailyScoreResponseType> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      MockApiFailed = !MockApiFailed;

      if (MockApiFailed) {
        reject("Some thing went wrong, please try again.");
      }

      resolve({
        data: {
          status: "saved",
          score,
        },
      });
    }, 500);
  });
};
