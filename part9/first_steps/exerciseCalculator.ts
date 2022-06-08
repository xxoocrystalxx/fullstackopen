interface DailyValues{
  daily: number[];
  target: number;
}

export interface Result{
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const parseArguments = (args: Array<string>): DailyValues => {
  console.log(args.length)
  if (args.length < 8) throw new Error('Not enough arguments');
  const c: string[] = args.slice(2);
  const d = c.map(v => {
    const matches = v.match(/\d/g);
    if(matches && matches.length>=2){
      return Number(matches[0].concat('.',matches[1]));
    }
    return Number(matches);
  });
  return {
    daily: d.slice(0, d.length-1),
    target: d[d.length-1]
  };
};

export const calculator = (daily: number[], target: number) : Result => {
  const total = daily.reduce((acc,val) => acc+=val,0);
  const average = total/daily.length;
  let rating;
  let descp;
  switch(true){
    case(average >= target): {
      rating = 3;
      descp= 'Amazing!';
      break;
    }
    case(average < target ): {
      descp = 'not too bad but could be better';
      rating = 2;
      break;
    }
    case (average == 0): {
      rating = 1;
      descp = 'Bad';
      break;
    }
    default: throw new Error('Wrong data!');
  }
  return {
    periodLength: daily.length,
    trainingDays: daily.reduce((acc,val) => val>0 ? acc+=1: acc, 0),
    success: daily.find( val => val==0) ? true : false,
    rating: rating,
    ratingDescription: descp,
    target: target,
    average: average
  };
};

try {
  const { daily, target } = parseArguments(process.argv);
  var array = JSON.parse(process.argv);
  console.log("jsonparse",array)
  console.log(calculator(daily,target));

} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

// const { daily, target } = parseArguments(process.argv);

// const d =c.map(v =>{
//   const matches = v.match(/\d/g)
//   if(matches.length>=2){
//     const n=Number(matches[0].concat('.',matches[1]))
//     return n
//   }
//   return Number(matches)
// })
// console.log(d)