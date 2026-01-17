import '../css/alert.css';
import { BsX } from 'react-icons/bs';
import { useAlertState } from '../context/alert/useAlertState';

export const Alert = () => {
  const { alert, hide } = useAlertState();

  if (!alert) return null;

  return (
    <div className={`alert alert-${alert.type || 'secondary'}`}>
      <div>{alert.text}</div>
      <BsX className="close-icon" onClick={hide} />
    </div>
  );
};
