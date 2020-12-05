type DigitValidator = (char: string) => boolean;

const testCharByRegex = regex => char => regex.test(char);

const numericValidator = testCharByRegex(/[0-9]{1}/);
const lowerCaseValidator = testCharByRegex(/[a-z]{1}/);
const upperCaseValidator = testCharByRegex(/[A-Z]{1}/);
const anyValidator = char => true;
const numberRangeValidator = (maxValue: number, char: string) => numericValidator(char) && parseInt(char, 10) <= maxValue;

export const neverValidator = char => false;

export const maskDigitValidators: { [key: string]: DigitValidator } = {
  'a': lowerCaseValidator,
  'A': upperCaseValidator,
  '*': anyValidator,
};

Array.from({ length: 9 }, (_, index) => maskDigitValidators[index] = numberRangeValidator.bind(null, index));
