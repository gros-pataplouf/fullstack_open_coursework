import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);

  return notification && notification.type ? (
    <Alert className={notification.type} data-testid={notification.type}>
      {notification.text}
    </Alert>
  ) : (
    <></>
  );
};

export default Notification;
