import { SHOW_ALERT, HIDE_ALERT } from "../types";

const handlers = {
  [SHOW_ALERT]: (_, action) => action.payload,
  [HIDE_ALERT]: () => null,
  DEFAULT: (state) => state,
};

export const AlertReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
