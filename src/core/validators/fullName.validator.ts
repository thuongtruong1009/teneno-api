import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

const pattern = /^[a-z]\w/;

@ValidatorConstraint({ name: 'customText', async: false })
export class fullNameValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments): boolean {
    return pattern.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return `Full name has must filled ! Args: ${args}`;
  }
}
