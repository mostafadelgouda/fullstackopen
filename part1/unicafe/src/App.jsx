import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// a proper place to define a component
const Statistics = (props) => {
  return(
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value ={props.good} />
          <StatisticLine text="neutral" value ={props.neutral} />
          <StatisticLine text="bad" value ={props.bad} />
          <StatisticLine text="all" value ={props.all} />
          <StatisticLine text="average" value ={props.average} />
          <StatisticLine text="positive" value ={props.positive + " %"} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <th>{text}</th>
      <th>{value}</th>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const addGood = () => {
    const updated = good + 1
    setGood(updated)
    setAll(updated + bad + neutral)
    setAverage((updated - bad) / (updated + bad + neutral))
    setPositive(updated / (updated + bad + neutral) * 100)
  }
  const addBad = () => {
    const updated = bad + 1
    setBad(updated)
    setAll(updated + good + neutral)
    setAverage((good - updated) / (updated + good + neutral))
    setPositive(good / (updated + good + neutral) * 100)
  }
  const addNeutral = () => {
    const updated = neutral + 1
    setNeutral(updated)
    setAll(updated + bad + good)
    setAverage((good - bad) / (updated + bad + good))
    setPositive(good / (updated + bad + good) * 100)
  }

  
  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => addGood()}>good</button>
      <button onClick={() => addNeutral()}>neutral</button>
      <button onClick={() => addBad()}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App
