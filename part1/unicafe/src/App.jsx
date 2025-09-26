import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const all = good + neutral + bad;
  const score = good - bad;

  if (all === 0) {
    return (
      <>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </>
    );
  }

  return (
    <>
      <h1>statistics</h1>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={score / all} />
        <StatisticLine text="positive" value={(good / all) * 100 + " %"} />
      </table>
    </>
  );
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Main = () => {
  return <h1>give feedback</h1>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setStatOnClick = (stat, setStat) => {
    return () => {
      const updatedStat = stat + 1;
      setStat(updatedStat);
    };
  };

  return (
    <div>
      <Main />
      <Button text="good" onClick={setStatOnClick(good, setGood)} />
      <Button text="neutral" onClick={setStatOnClick(neutral, setNeutral)} />
      <Button text="bad" onClick={setStatOnClick(bad, setBad)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
