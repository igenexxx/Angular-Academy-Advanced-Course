export const TAB = 9,
    LEFT_ARROW =	37,
    RIGHT_ARROW = 39,
    BACKSPACE = 8,
    DELETE = 46;

export const SPECIAL_CHARACTERS = [' ', '/', '(', ')', '+', '\/', '-'];

export function overWriteCharAtPosition(input: HTMLInputElement, position: number, key: string): string {
  const currentValue = input.value;

  return currentValue.slice(0, position) + key + currentValue.slice(position + 1);
}

export const findLastIndex = (inputText, predicate) => {
  const result = inputText.length - 1;

  if (!result) {
    return -1;
  }

  if (predicate(inputText.slice(-1))) {
    return result;
  }

  return findLastIndex(inputText.slice(0, -1), predicate);
}

export const findIndex = (inputText, predicate) => {
  let i = 0;
  for (const char of inputText) {
    if (predicate(char)) {
      return i;
    }
    i++;
  }

  return -1;
}
