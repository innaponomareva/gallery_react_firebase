import React, { useCallback, useReducer } from "react";
import { HIDE_ALERT, SHOW_ALERT } from "../types";
import { AlertContext } from "./alertContext";
import { AlertReducer } from "./alertReducer";

export const AlertState = ({ children }) => {
  const [state, dispatch] = useReducer(AlertReducer, null);

  const hide = useCallback(() => dispatch({ type: HIDE_ALERT }), []);

  const show = ({ text, type = "secondary" }) => {
    dispatch({
      type: SHOW_ALERT,
      payload: { text, type },
    });
  };

  return (
    <AlertContext.Provider
      value={{
        show,
        hide,
        alert: state,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
