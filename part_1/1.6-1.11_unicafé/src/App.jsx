/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = ({onClickHandler, text}) => {
  return <button onClick={onClickHandler}>{text}</button>
}


const App = () => {
  // save clicks of each button to its own state
  const [feedback, setFeedback ] = useState({
    good : 0, 
    neutral: 0, 
    bad: 0
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
      <h1>statistics</h1>
    <p>GOOD {feedback.good}</p>
    <p>NEUTRAL {feedback.neutral}</p>
    <p>BAD {feedback.bad}</p>
    </div>

  )
}

export default App