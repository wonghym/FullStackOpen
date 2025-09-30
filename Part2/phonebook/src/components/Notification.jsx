import "../index.css";

const Notification = ({ message, error }) => {
  const messageStyle = error ? { color: "red" } : { color: "green" };
  if (message === null) {
    return null;
  }

  return (
    <div className="message" style={messageStyle}>
      {message}
    </div>
  );
};

export default Notification;
