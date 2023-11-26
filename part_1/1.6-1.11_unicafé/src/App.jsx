/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = ({onClickHandler, text}) => {
  return <button onClick={onClickHandler}>{text}</button>
}


const App = () => {
  // save clicks of each button to its own state
  const [feedback, setFeedback ] = useState({
    good : {count: 0, value: 1}, 
    neutral: {count: 0, value: 0}, 
    bad: {count: 0, value: -1}
  })

  const handleFeedback = (how) => {
      const innerFunction = () => {
        switch(how) {
          case "good":
            setFeedback({...feedback, good: {...feedback.good, count: feedback.good.count + 1}});
            break;
          case "neutral":
            setFeedback({...feedback, neutral: {...feedback.neutral, count: feedback.neutral.count + 1}});
            break;
          case "bad":
            setFeedback({...feedback, bad: {...feedback.bad, count: feedback.bad.count + 1}});
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
      <h1>statistics</h1>
    <p>GOOD {feedback.good.count}</p>
    <p>NEUTRAL {feedback.neutral.count}</p>
    <p>BAD {feedback.bad.count}</p>
    <p>ALL {feedback.good.count + feedback.neutral.count + feedback.bad.count}</p>
    <p>AVERAGE {((feedback.good.value*feedback.good.count + feedback.bad.value*feedback.bad.count)/(feedback.good.count + feedback.neutral.count + feedback.bad.count)).toFixed(2)}</p>
    <p>POSITIVE {((feedback.good.value*feedback.good.count)/(feedback.good.count + feedback.neutral.count + feedback.bad.count)*100).toFixed(2)}%</p>

    </div>

  )
}

export default App