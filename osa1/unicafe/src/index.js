import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({ text, value }) => {
    return (
      <div>
        {text}{value}
      </div>
  )
}

const Statistics = (props) => {
  if (props.feedback.all !== 0) {
    return (
      <table>
        <tbody>
          <tr>
            <td><StatisticLine text={"Good: "} value={props.feedback.good} /></td>
          </tr>
          <tr>
            <td><StatisticLine text={"Neutral: "} value={props.feedback.neutral} /></td>
          </tr>
          <tr>
            <td><StatisticLine text={"All: "} value={props.feedback.all} /></td>
          </tr>
          <tr>
            <td><StatisticLine text={"Bad: "} value={props.feedback.bad} /></td>
          </tr>
          <tr>
            <td><StatisticLine text={"Average: "} value={props.feedback.average} /></td>
          </tr>
          <tr>
            <td><StatisticLine text={"Positive: "} value={props.feedback.positive + "%"} /></td>
          </tr>
        </tbody>
      </table>
    )
  } else {
    return (
      <div>
        <StatisticLine text={"No feeback given"} />
      </div>
    )
  }
}

const App = () => {
  ///Buttons
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //Feedback
  const all = good + neutral + bad
  const feedback = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: (good - bad) / all,
    positive: good / all * 100
  }

  //Functions
  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1) 

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => increaseGood()} text="Good" />
      <Button handleClick={() => increaseNeutral()} text="Neutral" />
      <Button handleClick={() => increaseBad()} text="Bad" />
      <h1>Statistics</h1>
      <Statistics feedback={feedback}/>
    </div>
  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)