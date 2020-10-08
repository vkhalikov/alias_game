import { useEffect } from 'react';
import _ from 'lodash/lang';

export const useDocumentEventListener = (eventTypes, handlers, condition = true) => {
  useEffect(() => {
    if (condition !== true) return;

    if (_.isPlainObject(eventTypes) && _.isPlainObject(handlers)) {
      const eventNames = Object.keys(eventTypes);

      eventNames.forEach((name) => {
        const type = eventTypes[name];
        const handler = handlers[name];

        document.addEventListener(type, handler);
      });

      return () => {
        eventNames.forEach((name) => {
          const type = eventTypes[name];
          const handler = handlers[name];

          document.removeEventListener(type, handler);
        });
      }
    } else if (_.isString(eventTypes) && _.isFunction(handlers)) {
      document.addEventListener(eventTypes, handlers);

      return (() => {
        document.removeEventListener(eventTypes, handlers);
      });
    } else {
      throw new Error('eventTypes and handlers should be both objects or a string and a function accordingly');
    }
  }, [eventTypes, handlers, condition]);
};