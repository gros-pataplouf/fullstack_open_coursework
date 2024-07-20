import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.notifications)

  const colorCodes = {
    warning: 'rgb(255, 0, 0)',
    info: 'rgb(0, 255, 0)'
  }
  const notificationStyle = {
    display: notification.type === '' ? 'none' : 'block',
    borderColor: notification.type && colorCodes[notification.type],
    borderStyle: 'solid',
    borderWidth: '3px',
    color: colorCodes[notification.type] && colorCodes[notification.type],
    padding: '15px',
  }
  return <p style={notificationStyle} data-testid={notification.type}>{notification.text}</p>
}

export default Notification
