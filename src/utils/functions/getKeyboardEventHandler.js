/* handlersMapping = {
  [code (event.key)]: handlerFunc,
  ...
} */

export const getKeyboardEventHandler = (handlersMapping) => {
  return function mainHandler(event) {
    const handlerByCode = handlersMapping[event.key];

    if (handlerByCode) {
      handlerByCode(event);
    }
  }
};
