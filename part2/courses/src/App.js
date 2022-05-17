const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part id={part.id} part={part}/>)}
  </>

  const Course = ({course,parts}) => {

    return (
      <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total sum={parts.reduce(
        (previousValue, currentValue) => previousValue + currentValue.exercises ,0)} />
      </div>
    )
  }

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development Curriculum</h1>
      {courses.map((course)=> {
        return <Course id={course.id} course={course.name} parts={course.parts}/>
      })}
    </div>
  )
}

export default App