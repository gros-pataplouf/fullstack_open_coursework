interface HeaderProps {
    courseName: string;
}

const Header = (props: HeaderProps) => {
  return (
    <div>{props.courseName}</div>
  )
}



export default Header