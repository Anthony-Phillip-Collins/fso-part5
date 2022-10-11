import cn from 'classnames';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Notification.module.css';

function Notification(props) {
  const { notification, onHidden } = props;
  const message = notification && notification.message;
  const error = notification && notification.error;
  const isError = notification && notification.isError;

  const [show, setShow] = useState();

  let msg = message || '';
  let showError = isError;

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
      clearTimeout(window.notificationTimeoutId);
      window.notificationTimeoutId = setTimeout(() => {
        setShow(false);
        onHidden();
      }, 3000);
    }
  }, [notification]);

  return show && msg ? (
    <div className={cn(styles.notification, showError && styles.error)}>
      {msg}
    </div>
  ) : null;
}

Notification.defaultProps = {
  notification: {},
  onHidden: () => {},
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
  onHidden: PropTypes.func,
};

export default Notification;
