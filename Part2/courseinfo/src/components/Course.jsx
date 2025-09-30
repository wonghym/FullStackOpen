const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <h2>
        total of {props.parts.reduce((acc, val) => acc + val.exercises, 0)}{" "}
        exercises
      </h2>
    </>
  );
};

const Course = (props) => {
  const { courses } = props;
  return (
    <div>
      {courses.map((course) => (
        <>
          <Header key={course.id} course={course.name} />
          <Content parts={course.parts} />
          <Total key={course.id} parts={course.parts} />
        </>
      ))}
    </div>
  );
};

export default Course;
