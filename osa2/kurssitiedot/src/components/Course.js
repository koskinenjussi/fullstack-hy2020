import React from 'react'

const Header = ({ name }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(parts =>
        <Part key={parts.id} part={parts.name} exercises={parts.exercises} />
      )}
    </div>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, parts) => sum + parts.exercises, 0)
  
  return (
    <b>Number of exercises {total}</b>
  )
}

const Course = ({ courses }) => {
    return (
      <div>
        {courses.map(course =>
          <div key={course.id}>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total id={course.id} parts={course.parts} />
          </div>
        )}
    
      </div>
    )
}

export default Course