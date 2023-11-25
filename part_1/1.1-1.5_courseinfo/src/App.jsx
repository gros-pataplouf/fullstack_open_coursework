const Header = (props) => {
// eslint-disable-next-line react/prop-types
  const {course} = props;
  return <h1>{course}</h1>
}

const Part = (props) => {
  // eslint-disable-next-line react/prop-types
  // eslint-disable-next-line react/prop-types
  const {name, exercises} = props.parts;
  return <p>{name}&nbsp;{exercises}</p>
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
    const courseArray = props.parts;
          // eslint-disable-next-line react/prop-types
    const total = courseArray.reduce((acc, current) => {
      return acc + current.exercises
    }, 0)
    return <p>Number of exercises {total}</p>

  }



const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App