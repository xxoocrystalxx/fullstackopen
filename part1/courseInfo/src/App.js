const Header = (props) => <h1>{props.course.name}</h1>


const Part = (props) => <>{props.name} {props.exercises}</>


const Content = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        <Part name={props.course.parts[0].name} exercises={props.course.parts[0].exercises} />
      </p>
      <p>
        <Part name={props.course.parts[1].name} exercises={props.course.parts[1].exercises} />
      </p>
      <p>
        <Part name={props.course.parts[2].name} exercises={props.course.parts[2].exercises} />
      </p>
      
    </div>
  )
}

const Total = (props) => {
  const total = props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
