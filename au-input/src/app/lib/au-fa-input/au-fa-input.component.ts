import {AfterContentInit, Component, ContentChild, HostBinding, Input} from '@angular/core';
import {InputRefDirective} from '../common/input-ref.directive';

@Component({
  selector: 'au-fa-input',
  templateUrl: './au-fa-input.component.html',
  styleUrls: ['./au-fa-input.component.css']
})
export class AuFaInputComponent implements AfterContentInit {
  @Input() icon: string;

  @ContentChild(InputRefDirective, { static: false }) input: InputRefDirective;

  @HostBinding('class.input-focus') get isInputFocus() {
    return this.input && this.input.focus;
  }

  constructor() { }

  ngAfterContentInit(): void {
    if (!this.input) {
      console.error('the au-fa-input needs an input inside its content');
    }
  }

  get classes() {
    return {
      ...(this.icon && {
        [`fa-${ this.icon }`]: true,
      })
    }
  }

}
