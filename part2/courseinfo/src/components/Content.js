import React from "react"
import Part from "./Part"

const Content = ({ parts }) =>
  parts.map((value) => <Part key={value.id} part={value} />)

export default Content
