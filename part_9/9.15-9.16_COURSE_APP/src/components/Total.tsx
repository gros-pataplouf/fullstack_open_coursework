interface TotalProps {
    totalExercises: number

}

const Total = (props: TotalProps) => {
  return (
    <div>Total: {props.totalExercises} exercises.</div>
  )
}

export default Total