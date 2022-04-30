import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [count, setCount] = useState(0)
  const [average, setAverage] = useState(0)

  const allReviews = () => {
    setCount(count+1)
  }

  //Neutral button does not add or decrease anything .
  const averageReviews = (event) => {
       if (event.target.id ===  "goodButton"){
         setAverage(average+1)
       }
      else if (event.target.id ===  "badButton"){
        setAverage(average-1)
      }
  }

  const goodReviews = (event) => {
    setGood(good+1)  
    allReviews() 
    averageReviews(event)
  }

  const neutralReviews = (event) => {
    setNeutral(neutral+1)
    allReviews()
    averageReviews(event)
  }

  const badReviews = (event) => {
    setBad(bad+1)
    allReviews()
    averageReviews(event)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button id = "goodButton" text="good" onClickFunction = {goodReviews}/>
      <Button id = "neutralButton" text="neutral"  onClickFunction = {neutralReviews}/>
      <Button id = "badButton" text="bad" onClickFunction = {badReviews}/>
      <h1>statistics</h1>

      {count === 0 ? 
      "no feedback given" : 
      <Statistics reviewType={{"good" : good , "neutral" : neutral , "bad" : bad , "all" : count , "average" : average}}/>}
    </div>
  )
}

const Button = (props) => {
return (
  <button id = {props.id} onClick = {(event) => {props.onClickFunction(event)}}>{props.text}</button>
)
}

const Statistics = (props) => {
  const good = props.reviewType.good
  const neutral = props.reviewType.neutral
  const bad = props.reviewType.bad
  const count = props.reviewType.all
  const average = props.reviewType.average

  return (
    <table>
    <tbody>
    <StatisticLine text="good" value={good}/>
    <StatisticLine text="neutral" value={neutral}/>
    <StatisticLine text="bad" value={bad}/>
    <StatisticLine text="all" value={count}/>
    <StatisticLine text="average" value={(count === 0 ? 0 : average/count)}/>
    <StatisticLine text="positive" value={(count === 0 ? 0 : good/count)*100+"%"}/>
    </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  return (
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}

export default App