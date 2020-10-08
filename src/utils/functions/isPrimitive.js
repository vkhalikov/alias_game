import _ from 'lodash/lang';

export function isPrimitive(value) {
  return _.isString(value) || _.isNumber(value) || _.isBoolean(value);
}