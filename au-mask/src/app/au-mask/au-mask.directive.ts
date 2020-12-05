import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { maskDigitValidators, neverValidator } from './digit_validators';
import {
  BACKSPACE, DELETE,
  findIndex,
  findLastIndex,
  LEFT_ARROW,
  overWriteCharAtPosition,
  RIGHT_ARROW,
  SPECIAL_CHARACTERS,
  TAB
} from './mask.utils';

@Directive({
  selector: '[au-mask]'
})
export class AuMaskDirective implements OnInit {
  @Input('au-mask') mask = '';

  input: HTMLInputElement;
  fullFieldSelected = false;

  @HostListener('keydown', ['$event', '$event.keyCode']) onKeyDown($event: KeyboardEvent, keyCode: number) {
    if ($event.metaKey || $event.ctrlKey) {
      return;
    }

    if (keyCode !== TAB) {
      $event.preventDefault();
    }

    const key = String.fromCharCode(keyCode);
    const cursorPosition = this.input.selectionStart;

    if (this.fullFieldSelected) {
      this.input.value = this.buildPlaceholder();
      const firstPlaceholderPosition = findIndex(this.input.value, char => char === '_');

      this.input.setSelectionRange(firstPlaceholderPosition, firstPlaceholderPosition);
    }

    switch (keyCode) {
      case LEFT_ARROW:
        this.handleLeftArrow(cursorPosition);

        return;
      case RIGHT_ARROW:
        this.handleRightArrow(cursorPosition);

        return;
      case BACKSPACE:
        this.handleBackspace(cursorPosition);

        return;
      case DELETE:
        this.handleDelete(cursorPosition);

        return;
    }

    const maskDigit = this.mask.charAt(cursorPosition);
    const digitValidator = maskDigitValidators[maskDigit] || neverValidator;

    if (digitValidator(key)) {
      this.input.value = overWriteCharAtPosition(this.input, cursorPosition, key);
      this.handleRightArrow(cursorPosition);
    }
  }

  @HostListener('select', ['$event']) onSelect(event: UIEvent) {
    this.fullFieldSelected = this.input.selectionEnd - this.input.selectionStart !== this.input.value.length;
  }

  constructor(
    el: ElementRef,
  ) {
    this.input = el.nativeElement;
  }

  ngOnInit(): void {
    this.input.value = this.buildPlaceholder();
  }

  calculatePreviousCursorPosition(cursorPosition: number): number {
    const valueBeforeCursor = this.input.value.slice(0, cursorPosition);

    return findLastIndex(valueBeforeCursor, char => !SPECIAL_CHARACTERS.includes(char));
  }

  handleBackspace(cursorPosition: number): void {
    const previousPosition = this.calculatePreviousCursorPosition(cursorPosition);

    if (previousPosition >= 0) {
      this.input.value = overWriteCharAtPosition(this.input, previousPosition, '_');
      this.input.setSelectionRange(previousPosition, previousPosition);
    }
  }

  handleDelete(cursorPosition: number): void {
    this.input.value = overWriteCharAtPosition(this.input, cursorPosition, '_');
    this.input.setSelectionRange(cursorPosition, cursorPosition);
  }

  handleLeftArrow(cursorPosition) {
    const previousPosition = this.calculatePreviousCursorPosition(cursorPosition);

    if (previousPosition >= 0) {
      this.input.setSelectionRange(previousPosition, previousPosition);
    }
  }

  handleRightArrow(cursorPosition) {
    const valueAfterCursor = this.input.value.slice(cursorPosition + 1);
    const nextPosition = findIndex(valueAfterCursor, char => !SPECIAL_CHARACTERS.includes(char));

    if (nextPosition >= 0) {
      const newCursorPosition = cursorPosition + nextPosition + 1;
      this.input.setSelectionRange(newCursorPosition, newCursorPosition);
    }
  }

  buildPlaceholder(): string {
    const chars = this.mask.split('');

    return chars.reduce((result, char) => {
      result += SPECIAL_CHARACTERS.includes(char) ? char : '_';

      return result;
    }, '');
  }
}

