import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const parttern = /\.(jpeg|jpg|gif|png)$/;
@ValidatorConstraint({ name: 'customeImage', async: false })
export class imageValidator implements ValidatorConstraintInterface {
  validate(
    image: string,
    args: ValidationArguments,
  ): boolean | Promise<boolean> {
    const isMatched = image.match(parttern);
    return isMatched && isMatched != null ? true : false;
  }

  defaultMessage(args: ValidationArguments): string {
    return `Image has must filled ! Args: ${args}`;
  }
}
