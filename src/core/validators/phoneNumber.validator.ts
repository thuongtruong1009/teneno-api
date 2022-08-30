import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

const pattern = /^(^\+[0-9]|^0)?[0-9]\d{9,15}$/;

@ValidatorConstraint({ name: 'customText', async: false })
export class phoneNumberValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments): boolean {
    return pattern.test(text);
  }

  defaultMessage(args: ValidationArguments): string {
    return `Phone number has must filled ! Args: ${args}`;
  }
}
