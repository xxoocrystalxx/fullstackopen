interface Part {
  name: string;
  exerciseCount: number;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartDetail extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartDetail {
  type: 'normal';
}

interface CourseSubmissionPart extends CoursePartDetail {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSpecialPart extends CoursePartDetail {
  type: 'special';
  requirements: string[];
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

const Header = ({ name }: { name: string }) => <h1>{name}</h1>;

const Content = ({ parts }: { parts: CoursePart[] }) => (
  <>
    {parts.map((p) => (
      <Part part={p} key={p.name} />
    ))}
  </>
);

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
        </p>
      );
    case 'groupProject':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>{' '}
          <br />
          project exercises {part.groupProjectCount}
        </p>
      );
    case 'submission':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i> <br />
          submit to {part.exerciseSubmissionLink}
        </p>
      );
    case 'special':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>{' '}
          <br />
          <i>{part.description}</i> <br />
          required skills {part.requirements.join(' ')}
        </p>
      );
    default:
      return <div>No match found</div>;
  }
};

const Total = ({ total }: { total: number }) => (
  <p> Number of exercises {total}</p>
);

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal'
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal'
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject'
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission'
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special'
    }
  ];

  const total = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={total} />
    </div>
  );
};

export default App;
