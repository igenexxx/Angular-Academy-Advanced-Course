import { AfterContentInit, Component, ContentChild, HostBinding, Input } from '@angular/core';
import { InputRefDirective } from '../common/input-ref.directive';

@Component({
  selector: 'au-md-input',
  templateUrl: './au-md-input.component.html',
  styleUrls: ['./au-md-input.component.css']
})
export class AuMdInputComponent implements AfterContentInit {
  @Input() icon: string;

  @ContentChild(InputRefDirective, { static: true }) input: InputRefDirective;

  constructor() { }

  ngAfterContentInit(): void {
    if (!this.input) {
      console.error('the au-md-input needs an input inside its content');
    }
  }

  @HostBinding('class.input-focus') get isInputFocus() {
    return this.input ? this.input.focus : false;
  }

}
