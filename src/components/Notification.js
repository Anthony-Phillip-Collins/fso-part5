import cn from 'classnames';
import styles from './Notification.module.css';

const Notification = ({ message, isError }) =>
  message ? (
    <div className={cn(styles.notification, isError && styles.error)}>
      {message}
    </div>
  ) : null;

export default Notification;
