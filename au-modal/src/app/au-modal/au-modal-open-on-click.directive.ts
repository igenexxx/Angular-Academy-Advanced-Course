import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuModalService } from './au-modal.service';

@Directive({
  selector: '[auModalOpenOnClick]'
})
export class AuModalOpenOnClickDirective implements OnInit, OnDestroy {
  elements: HTMLBaseElement[];

  @Input() set auModalOpenOnClick(el: HTMLBaseElement | HTMLBaseElement[]) {
    this.elements = [].concat(el);

    this.elements.forEach(element => element.addEventListener('click', this.clickHandler.bind(this)));
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private modalService: AuModalService,
  ) { }

  ngOnInit(): void {
    this.modalService.close$.subscribe(() => this.viewContainer.clear());
  }

  ngOnDestroy(): void {
    this.elements.forEach(el => el.removeEventListener('click', this.clickHandler));
  }

  clickHandler() {
    this.viewContainer.clear();
    this.viewContainer.createEmbeddedView(this.templateRef);
  }
}
