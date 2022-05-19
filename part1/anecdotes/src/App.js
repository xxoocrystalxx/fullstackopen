import { useState } from "react"

const Button = ({ handle, text }) => <button onClick={handle}>{text}</button>

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([])
  const [maxVotes, setMaxVotes] = useState(0)

  if (votes.length === 0) {
    const newVotes = Array(anecdotes.length).fill(0)
    setVotes(newVotes)
  }

  const addVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    if (newVotes[selected] > newVotes[maxVotes]) {
      setMaxVotes(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes.</p>
      <Button handle={addVote} text="vote" />
      <Button
        handle={() => setSelected(Math.floor(Math.random() * anecdotes.length))}
        text="next anecdote"
      />
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxVotes]}
      <p>has {votes[maxVotes]} </p>
    </div>
  )
}

export default App
