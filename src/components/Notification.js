import cn from 'classnames';
import { useEffect, useState } from 'react';
import styles from './Notification.module.css';

const Notification = (props) => {
  const { message, error, isError, onHidden } = props;

  const [show, setShow] = useState();

  let msg = message || '';
  let showError = isError;

  if (error) {
    showError = true;
    msg =
      error?.response?.data?.error?.message ||
      'Somthing went wrong. You may have to log out and back in again.';
  }

  useEffect(() => {
    if (message || error) {
      setShow(true);
      clearTimeout(window.notificationTimeoutId);
      window.notificationTimeoutId = setTimeout(() => {
        setShow(false);
        onHidden();
      }, 3000);
    }
  }, [message, error, onHidden]);

  return show && msg ? (
    <div className={cn(styles.notification, showError && styles.error)}>
      {msg}
    </div>
  ) : null;
};

export default Notification;
