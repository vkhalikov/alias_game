export class ValidationMessage {
  constructor(id, defaultMessage) {
    if (!id && !defaultMessage) {
      throw new Error('An "id" and "defaultMessage" should be provided');
    }

    this.defaultMessage = defaultMessage;
    this.id = `ValidationMessage-${id}`;
  }
}

export const required = (value) => {
  if (value) {
    return true;
  }

  return new ValidationMessage('required', `Обязательное поле`);
};

export const less = (threshold) => {
  return (value) => {
    if (value < threshold) {
      return true;
    }

    return new ValidationMessage('less', `Значение должно быть меньше ${threshold}`);
  };
}

export const lessEqual = (threshold) => {
  return (value) => {
    if (value <= threshold) {
      return true;
    }

    return new ValidationMessage('lessEqual', `Значение должно быть меньше или равно ${threshold}`);
  };
}

export const more = (threshold) => {
  return (value) => {
    if (value > threshold) {
      return true;
    }

    return new ValidationMessage('more', `Значение должно быть больше ${threshold}`);
  };
}

export const moreEqual = (threshold) => {
  return (value) => {
    if (value >= threshold) {
      return true;
    }

    return new ValidationMessage('moreEqual', `Значение должно быть больше или равно ${threshold}`);
  };
}

export const range = (lowerThreshold, higherThreshold) => {
  return (value) => {
    if (value >= lowerThreshold && value <= higherThreshold) {
      return true;
    }

    return new ValidationMessage('range', `Значение должно находится в диапазоне от ${lowerThreshold} до ${higherThreshold}`);
  };
}
