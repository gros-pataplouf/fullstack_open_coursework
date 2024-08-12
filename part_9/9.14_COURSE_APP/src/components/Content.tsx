interface ContentProps {
    name: string,
    exerciseCount: number

}

const Content = (props: ContentProps) => {
  return (
    <div>{props.name} {props.exerciseCount}</div>
  )
}

export default Content;