const Header = (props) => {
// eslint-disable-next-line react/prop-types
  const {course} = props;
  return <h1>{course}</h1>
}

const Part = (props) => {
  // eslint-disable-next-line react/prop-types
  console.log(props)
  // eslint-disable-next-line react/prop-types
  const {name, number} = props.parts;
  return <p>{name}&nbsp;{number}</p>
}

const Content = (props) => {
  // eslint-disable-next-line react/prop-types
    const courseArray = props.parts;
    return courseArray.map(part => {
      return <Part key={courseArray.indexOf(part)} parts={part}/>
      }
    )
  }

  const Total = (props) => {
      // eslint-disable-next-line react/prop-types
    const {total} = props;
    return <p>Number of exercises {total}</p>

  }



const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content parts={[{name: part1, number: exercises1}, {name: part2, number: exercises2}, {name: part3, number: exercises3}]}/>
      <Total total = {exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App