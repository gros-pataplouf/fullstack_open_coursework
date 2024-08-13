import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: CoursePart): JSX.Element => {
  switch (props.kind) {
    case "basic":
      return (
        <div>
          <h2>Title: {props.name}</h2>
          <p>Exercises: {props.exerciseCount}</p>
          <p>Description: {props.description}</p>
          <hr />
        </div>
      );
    case "background":
      return (
        <div>
          <h2>Title: {props.name}</h2>
          <p>Exercises: {props.exerciseCount}</p>
          <p>Description: {props.description}</p>
          <p>Background Material: {props.backgroundMaterial}</p>
          <hr />
        </div>
      );
    case "group":
      return (
        <div>
          <h2>Title: {props.name}</h2>
          <p>Exercises: {props.exerciseCount}</p>
          <p>Group Projects: {props.groupProjectCount}</p>
          <hr />
        </div>
      );
      case "special":
        return (
          <div>
            <h2>Title: {props.name}</h2>
            <p>Exercises: {props.exerciseCount}</p>
            <p>Description: {props.description}</p>
            <p>Requirements: {props.requirements.map(req => <span>{req} </span>)}</p>

            <hr />
          </div>
        );
    default:
      return assertNever(props);
  }
};

export default Part;
