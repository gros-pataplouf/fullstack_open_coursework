const Notification = ({message}) => {
  const notificationStyle = {
      display: message.type === "" ? "none" : "block",
      borderColor: message.type === "warning" ? "red" : "green",
      borderStyle: "solid",
      borderWidth: "3px",
      color: message.type === "warning" ? "red" : "green",
      backgroundColor: "azure",
      padding: "15px",
    };
    
  console.log(message, notificationStyle)
  return <p style={notificationStyle}>{message.text}</p>;
};

export default Notification;
