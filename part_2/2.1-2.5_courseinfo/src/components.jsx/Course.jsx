/* eslint-disable react/prop-types */

const Sum = ({ parts }) => {
  const sumOfExos = parts.reduce((a, b) => a + b.exercises, 0);
  return (
    <tfoot>
      <tr className="table__course-sum table__course-row">
        <td>Total of</td>
        <td>{sumOfExos}&nbsp;exercises</td>
      </tr>
    </tfoot>
  );
};

const Header = ({ name }) => {
  return (
    <thead>
      <tr>
        <td colSpan={2} className="table__course-title">
          {name}
        </td>
      </tr>
    </thead>
  );
};

const Part = ({ part }) => {
  return (
    <tr className="table__course-row">
      <td className="table__course-cell">{part.name}</td>
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

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <table key={course.id} className="table__course">
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Sum parts={course.parts} />
          </table>
        );
      })}
    </div>
  );
};

export default Course;
