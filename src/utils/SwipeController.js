import { isFunction, isObject } from 'lodash/lang';

const unifyEvents = (e) => e.changedTouches ? e.changedTouches[0] : e;

const supportedEvents = ['move', 'reset', 'swipeUp', 'swipeRight', 'swipeDown', 'swipeLeft'];

export class SwipeController {
  constructor({ axisLockThreshold = 10, swipeThreshold = 75, on } = {}) {
    this.axisLockThreshold = axisLockThreshold;
    this.swipeThreshold = swipeThreshold;

    this.handlers = {};

    if (on) {
      if (isObject(on)) {
        Object.keys(on).forEach((eventName) => {
          if (!supportedEvents.includes(eventName)) {
            throw new Error(`Event "${eventName}" is not supported. Supported events list: ${supportedEvents.join(', ')}.`)
          }

          if (!this.handlers[eventName]) {
            this.handlers[eventName] = [];
          }

          const handler = on[eventName];

          if (!isFunction(handler)) {
            throw new Error(`Handler must be a function, got ${typeof handler} instead`);
          }

          this.handlers[eventName].push(handler);
        });
      } else {
        throw new Error('"on" property must be an object containing event handlers');
      }
    }
  }

  lock = false;
  axisLock = false;
  startX = null;
  startY = null;

  handleStart = (e) => {
    this.lock = true;

    const unifiedEvent = unifyEvents(e);

    this.startX = unifiedEvent.clientX;
    this.startY = unifiedEvent.clientY;
  };

  handleMove = (e) => {
    e.preventDefault();

    if (!this.lock) return;

    const { clientX: currentX, clientY: currentY } = unifyEvents(e);

    const dX = currentX - this.startX;
    const dY = this.startY - currentY;

    const signX = Math.sign(dX);
    const signY = Math.sign(dY);

    const eventData = {
      dX,
      dY,
    };

    this.emitEvent('move', eventData);

    if (Math.abs(dY) > this.swipeThreshold) {
      if (signY > 0) {
        this.emitEvent('swipeUp', eventData);
      } else if (signY < 0) {
        this.emitEvent('swipeDown', eventData);
      }

      this.reset();
    }

    if (Math.abs(dX) > this.swipeThreshold) {
      if (signX > 0) {
        this.emitEvent('swipeRight', eventData);
      } else if (signX < 0) {
        this.emitEvent('swipeLeft', eventData);
      }

      this.reset();
    }
  };

  handleEnd = () => {
    if (!this.lock) return;

    this.reset();
  };

  handleCancel = () => {
    this.reset();
  };

  reset = () => {
    this.lock = false;

    this.emitEvent('reset');
  }

  emitEvent = (eventName, data) => {
    this.handlers[eventName].forEach((handler) => {
      handler(data);
    })
  };
}
