import { isFunction } from 'lodash/lang';

const eventNames = ['turn_finish'];

export const validateEventListener = (eventName, callbackFn) => {
  if (!eventName.includes(eventName)) {
    throw new Error(`Incorrect event name: ${eventName}`);
  }

  if (!isFunction(callbackFn)) {
    throw new Error(`Event handler should be a function while you provided ${typeof callbackFn}`);
  }
};

export const getEventListenersCleanState = () => {
  const eventListeners = {};

  eventNames.forEach((eventName) => {
    eventListeners[eventName] = [];
  });

  return eventListeners;
};