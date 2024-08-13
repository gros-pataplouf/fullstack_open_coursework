interface ContentProps {
    name: string,
    exerciseCount: number

}

const Content = (props: ContentProps) => {
  return (
    <h1>{props.name} {props.exerciseCount}</h1>
  )
}

export default Content;