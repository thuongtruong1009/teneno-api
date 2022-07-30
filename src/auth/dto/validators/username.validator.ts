import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

const pattern = /^[a-z]/gi;

@ValidatorConstraint({ name: 'customText', async: false })
export class usenameValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return pattern.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Username has must filled !';
  }
}
