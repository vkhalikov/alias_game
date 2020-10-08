import { isFunction } from 'lodash/lang'
import { isPrimitive } from 'utils/functions/isPrimitive';

export class FormSchema {
  constructor(schema) {
    this.validateSchema(schema);

    const schemaEntries = Object.entries(schema);

    this.values = this.getDefaultValuesFromEntries(schemaEntries);
    this.validators = this.getValidatorsFromEntries(schemaEntries);
  }

  validateSchema(schema) {
    const descriptors = Object.values(schema);

    descriptors.forEach(({ validators }) => {
      if (validators) {
        if (!Array.isArray(validators)) {
          throw new Error('Validators have to be an array');
        }

        if (validators.length === 0) {
          throw new Error('You should provide at least one validator if the "validators" property is used');
        }

        validators.forEach((validator) => {
          if (!validator.validate && !isFunction(validator)) {
            throw new Error('Each validator should be a function or an object with "validate" method');
          }
        })
      }
    });
  }

  getDefaultValuesFromEntries(schemaEntries) {
    return this.parseSchemaEntries(schemaEntries, 'defaultValue');
  }

  getValidatorsFromEntries(schemaEntries) {
    return this.parseSchemaEntries(schemaEntries, 'validators');
  }

  parseSchemaEntries(schemaEntries, key) {
    return schemaEntries.reduce((result, [name, desc]) => {
      const value = (isPrimitive(desc) && key === 'defaultValue') ? desc : desc[key]; // Support schema fields that only have a default value (e.g. { name: "Bobba Fett" })

      return { ...result, [name]: value };
    }, {});
  }
}
