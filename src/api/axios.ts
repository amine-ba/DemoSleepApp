export const mockedAxios = {
  post: (_url: string, payload: any) => saveDailyScore(payload),
};

let MockApiFailed = true;

const saveDailyScore = async (score: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      MockApiFailed = !MockApiFailed;

      if (MockApiFailed) {
        reject("Some thing went wrong, please try again.");
      }

      resolve({
        data: {
          status: "success",
          score,
        },
      });
    }, 500);
  });
};
