/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = ({onClickHandler, text}) => {
  return <button onClick={onClickHandler}>{text}</button>
}

const StatisticsLine = ({text, value}) => {
  return (<tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>)
}

const Statistics = ({feedback}) => {
  return (
    <div>

    <h1>statistics</h1>
    {feedback.bad + feedback.good + feedback.neutral === 0?
      <p>No feedback given</p> :
      <table>
        <tbody>
        <StatisticsLine text="Good" value={feedback.good}/>
        <StatisticsLine text="Neutral" value={feedback.neutral}/>
        <StatisticsLine text="Bad" value={feedback.bad}/>
        <StatisticsLine text="All" value={feedback.good + feedback.neutral + feedback.bad}/>
        <StatisticsLine text="Average" value={((feedback.good - feedback.bad)/(feedback.good + feedback.neutral + feedback.bad)).toFixed(2)}/>
        <StatisticsLine text="Positive" value={`${((feedback.good)/(feedback.good + feedback.neutral + feedback.bad)*100).toFixed(2)}%`}/>
        </tbody>
    </table>
    }
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [feedback, setFeedback ] = useState({
    good : 0, 
    neutral: 0, 
    bad: 0,
  })

  const handleFeedback = (how) => {
      const innerFunction = () => {
        switch(how) {
          case "good":
            setFeedback({...feedback, good: feedback.good + 1});
            break;
          case "neutral":
            setFeedback({...feedback, neutral: feedback.neutral + 1});
            break;
          case "bad":
            setFeedback({...feedback, bad: feedback.bad + 1});
            break;
        }
      }
      return innerFunction
    }
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClickHandler={handleFeedback("good")} text="good"/>
      <Button onClickHandler={handleFeedback("neutral")} text="neutral"/>
      <Button onClickHandler={handleFeedback("bad")} text="bad"/>
      <Statistics feedback={feedback}/>
    </div>

  )
}

export default App