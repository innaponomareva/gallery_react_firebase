import React, { useContext } from "react";
import "../css/alert.css";
import { BsX } from "react-icons/bs";
import { AlertContext } from "../context/alert/alertContext";

export const Alert = () => {
  const { alert, hide } = useContext(AlertContext);

  if (!alert) return null;

  return (
    <div className={`alert alert-${alert.type || "secondary"}`}>
      <div>{alert.text}</div>
      <BsX className="close-icon" onClick={hide} />
    </div>
  );
};
