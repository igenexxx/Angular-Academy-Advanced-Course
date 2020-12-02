import { AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { AuTabComponent } from '../au-tab/au-tab.component';

@Component({
  selector: 'au-tab-panel',
  templateUrl: './au-tab-panel.component.html',
  styleUrls: ['../tab-panel.component.scss']
})
export class AuTabPanelComponent implements AfterContentInit {
  @Input() headerTemplate: TemplateRef<any>;

  @ContentChildren(AuTabComponent) tabs: QueryList<AuTabComponent>;

  ngAfterContentInit(): void {
    const selectedTab = this.tabs.find(tab => tab.selected);

    if (!selectedTab && this.tabs.first) {
      this.tabs.first.selected = true;
    }
    console.log(selectedTab);
  }

  selectTab(tab: AuTabComponent): void {
    this.tabs.forEach(currentTab => currentTab.selected = false);
    tab.selected = true;
  }

  get tabsContext() {
    return {
      tabs: this.tabs,
    }
  }
}
