import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

const pattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

@ValidatorConstraint({ name: 'customText', async: false })
export class passwordValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return pattern.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Username has must filled !';
  }
}
