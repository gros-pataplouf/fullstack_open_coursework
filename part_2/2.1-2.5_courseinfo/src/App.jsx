/* eslint-disable react/prop-types */
const Header = ({ name }) => {
  return (
    <thead>
      <tr>
        <td colSpan={2}>{name}</td>
      </tr>
    </thead>
  );
};

const Part = ({ part }) => {
  return (
    <tr>
      <td>{part.name}</td>
      <td>{part.exercises}</td>
    </tr>
  );
};

const Content = ({ parts }) => {
  return (
    <tbody>
      {parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
    </tbody>
  );
};

const Course = ({ course }) => {
  return (
    <table>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </table>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
