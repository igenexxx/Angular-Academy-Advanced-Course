import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { AuModalService } from './au-modal.service';

@Component({
  selector: 'au-modal',
  templateUrl: './au-modal.component.html',
  styleUrls: ['./au-modal.component.scss']
})
export class AuModalComponent implements OnInit {
  @Input() body: TemplateRef<any>;
  @Input() context: any;
  @Input() hideOnEsc = true;
  @Input() hideOnClickOutside = true;

  constructor(
    private modalService: AuModalService,
    private eventManager: EventManager,
  ) { }

  ngOnInit() {
    this.eventManager.addGlobalEventListener('window', 'keyup.esc', () => {
      if (this.hideOnEsc) {
        this.close();
      }
    });
  }

  close(): void {
    this.modalService.close()
  }

  cancelClick(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
  }

  onClickOutside(): void {
    if (this.hideOnClickOutside) {
      this.close();
    }
  }
}
