import React from "react"
import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ course }) => {
  const sum = (parts) => {
    return parts.reduce((sum, value) => (sum += value.exercises), 0)
  }

  return (
    <div>
      {course.map((value) => (
        <div key={value.id}>
          <Header course={value.name} />
          <Content parts={value.parts} />
          <Total sum={sum(value.parts)} />
        </div>
      ))}
    </div>
  )
}

export default Course
