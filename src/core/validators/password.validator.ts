import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

const pattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

@ValidatorConstraint({ name: 'customText', async: false })
export class passwordValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments): boolean {
    return pattern.test(text);
  }

  defaultMessage(args: ValidationArguments): string {
    return `Password has must filled ! Args: ${args}`;
  }
}
