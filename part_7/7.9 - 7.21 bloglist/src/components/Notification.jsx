import { store } from "../reducers/notificationReducer"

const Notification = ({ message }) => {
  const colorCodes = {
    warning: 'rgb(255, 0, 0)',
    info: 'rgb(0, 255, 0)'
  }
  const notificationStyle = {
    display: store.getState().type === '' ? 'none' : 'block',
    borderColor: store.getState().type && colorCodes[store.getState().type],
    borderStyle: 'solid',
    borderWidth: '3px',
    color: colorCodes[store.getState().type] && colorCodes[store.getState().type],
    padding: '15px',
  }
  return <p style={notificationStyle} data-testid={store.getState().type}>{store.getState().text}</p>
}

export default Notification
