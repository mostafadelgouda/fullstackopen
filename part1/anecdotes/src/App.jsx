import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [votes, addVote] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const [selected, setSelected] = useState(0)
  const [mostVotedIndex, setMostVotedIndex] = useState(0)
  const addToVote = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    addVote(newVotes);
    getToMostVotedIndex()
  };
  const getToMostVotedIndex = () => {
    for(let i = 0 ; i < 8 ; i++)
      if(votes[mostVotedIndex] < votes[i])
        setMostVotedIndex(i)
  }
  console.log(votes[selected])
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      
      <div>has {votes[selected]} votes</div>
      <button onClick={() => addToVote()}>
        Vote
      </button>
      <button onClick={() => setSelected(getRandomInt(8))}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostVotedIndex]}</div>
      
      <div>has {votes[mostVotedIndex]} votes</div>
    </div>
  )
}
export default App
