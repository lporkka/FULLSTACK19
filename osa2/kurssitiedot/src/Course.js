import React from 'react'

const Course = ({ course }) => {
  return (
    <div key={course.id}>
      <Header course={course.name} />
      <Content osat={course.parts} />
      <Total osat={course.parts} />
    </div>
  )
}


const Header = props =>
  <h1>{props.course}</h1>

const Total = ({ osat }) => {
  const total = osat.map(osa => osa.exercises).reduce((s, p) => s + p)
  return <p>yhteensä {total} tehtävää</p>
}


const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = (props) => {
  const { osat } = props
  const rows = () =>
    osat.map(osa => <li key={osa.id}><Part part={osa} /></li>)

  return (
    <ul>
      {rows()}
    </ul>
  )
}

export default Course