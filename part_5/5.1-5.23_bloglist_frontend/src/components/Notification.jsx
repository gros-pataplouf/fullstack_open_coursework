const Notification = ({ message }) => {
  const colorCodes = {
    warning: 'rgb(255, 0, 0)',
    info: 'rgb(0, 255, 0)'
  }
  const notificationStyle = {
    display: message.type === '' ? 'none' : 'block',
    borderColor: message.type && colorCodes[message.type],
    borderStyle: 'solid',
    borderWidth: '3px',
    color: message.type && colorCodes[message.type],
    padding: '15px',
  }
  return <p style={notificationStyle} data-testid={message.type}>{message.text}</p>
}

export default Notification
