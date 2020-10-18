import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Votes = (props) => {
  return (
    <div>
      Has {props.votes} votes
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setvotes] = useState(new Array(props.anecdotes.length).fill(0))
  const highestVote = votes.indexOf(Math.max(...votes))

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  const voteAnecdote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setvotes(votesCopy)

  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <Votes votes={votes[selected]} />
      <div>
        <button onClick={() => voteAnecdote()}>Vote</button>
        <button onClick={() => randomAnecdote()}>Next anecdote</button>
      </div>
      <h1>Anecdote with most vote(s)</h1>
      {props.anecdotes[highestVote]}
      <Votes votes={votes[highestVote]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)