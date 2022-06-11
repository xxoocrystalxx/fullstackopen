interface DailyValues {
  daily: number[];
  target: number;
}

export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const parseArguments = (args: Array<string>): DailyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const argWithoutPath: string[] = args.slice(2);

  const array: Array<number> = argWithoutPath.map((n) => {
    if (!isNaN(Number(n))) {
      return parseFloat(n);
    } else {
      throw new Error('Provided values were not numbers!');
    }
  });

  return {
    daily: array.slice(1),
    target: array[0]
  };
};

export const calculator = (daily: number[], target: number): Result => {
  const total = daily.reduce((acc, val) => (acc += val), 0);
  const average = total / daily.length;
  let rating;
  let descp;
  switch (true) {
    case average >= target: {
      rating = 3;
      descp = 'Amazing!';
      break;
    }
    case average < target && average >= 1.5: {
      descp = 'not too bad but could be better';
      rating = 2;
      break;
    }
    case average < 1.5: {
      rating = 1;
      descp = 'Bad';
      break;
    }
    default:
      throw new Error('Something bad happened!');
  }
  return {
    periodLength: daily.length,
    trainingDays: daily.reduce((acc, val) => (val > 0 ? (acc += 1) : acc), 0),
    success: daily.find((val) => val == 0) ? true : false,
    rating: rating,
    ratingDescription: descp,
    target: target,
    average
  };
};

try {
  const { daily, target } = parseArguments(process.argv);
  console.log(calculator(daily, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
