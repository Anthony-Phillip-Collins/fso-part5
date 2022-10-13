import cn from 'classnames';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Notification.module.css';

function Notification({ notification }) {
  const message = notification && notification.message;
  const error = notification && notification.error;
  const isError = notification && notification.isError;

  const [show, setShow] = useState();

  let msg = message || '';
  let showError = isError;
  let timeoutId;

  if (error) {
    showError = true;
    try {
      msg = error.response.data.error.message;
    } catch (e) {
      msg = 'Somthing went wrong. You may have to log out and back in again.';
    }
  }

  useEffect(() => {
    if (message || error) {
      setShow(true);
      timeoutId = setTimeout(() => {
        setShow(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [notification]);

  return show && msg ? (
    <div
      className={cn(styles.notification, showError && styles.error)}
      data-test="notification"
    >
      {msg}
    </div>
  ) : null;
}

Notification.defaultProps = {
  notification: {},
};

Notification.propTypes = {
  notification: PropTypes.shape({
    message: PropTypes.string,
    error: PropTypes.shape({
      response: PropTypes.shape({
        data: PropTypes.shape({
          error: PropTypes.shape({ message: PropTypes.string }),
        }),
      }),
    }),
    isError: PropTypes.bool,
  }),
};

export default Notification;
