
const Course = (props) => {
  const {course} = props
  return (
    <>
      <Header name={course.name} ></Header>
      <Content parts={course.parts} ></Content>
      <Total parts={course.parts} ></Total>
    </> 
  )
}


const Header = (props) => {
  const {name} = props
  return <h3>{name}</h3>
} 


const Content = (props) => {
  const {parts} = props
  return (
    <>
    {parts.map(part => 
      <Part key={part.id} name={part.name} ex={part.exercises}/>)}
    </>
  )
}


const Total = (props) => {
  const {parts} = props
  const total = parts.reduce((acc, part) => acc + part.exercises, 0)
  return <h4> total of {total} excercises </h4>
}


const Part = (props) => <p>{props.name} {props.ex}</p>


export default Course