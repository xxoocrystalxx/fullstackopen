import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculator } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  return res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const h = Number(req.query.height);
  const w = Number(req.query.weight);

  if (!h || !w) {
    return res.send({
      error: 'malformatted parameters'
    });
  }

  const result = calculateBmi(h, w);
  return res.send({
    weight: w,
    height: h,
    bmi: result
  });
});

app.post('/calculator', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res
      .send({
        error: 'parameters missing'
      })
      .status(400);
  }

  if (isNaN(Number(target)) || typeof daily_exercises === 'string') {
    return res
      .send({
        error: 'malformatted parameters'
      })
      .status(400);
  }

  daily_exercises.forEach((hours: string) => {
    if (isNaN(parseFloat(hours))) {
      res.status(400).json({
        error: 'malformatted parameters'
      });
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(daily_exercises, target);
  return res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
