import { Component, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuTabPanelComponent } from './au-tab-panel/au-tab-panel.component';
import { AuTabComponent } from './au-tab/au-tab.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;
  let tabPanel: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, AuTabPanelComponent, AuTabComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    tabPanel = el.query(By.css('#tab-panel'));

    fixture.detectChanges();
  })

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should find only one tab inside the tab container', async(() => {
    const tabs = tabPanel.queryAll(By.css('.tab'));

    expect(tabs).toBeTruthy();
    expect(tabs.length).toBe(1);
  }));

  it('should find the Login tab button marked as active', async(() => {
    const selectedButton = tabPanel.query(By.css('.tab-panel-buttons li.selected')).nativeElement;

    expect(selectedButton).toBeTruthy();
    expect(selectedButton.textContent).toBe('Login');
  }));

  it('should display the Login tab', async(() => {
    const loginEmail = tabPanel.query(By.css('.login-email'));

    expect(loginEmail).toBeTruthy();
  }));

  it('should switch to the Login Tab', async(() => {
    const tabButtons = tabPanel.queryAll(By.css('.tab-panel-buttons li'));

    console.log(tabButtons.length);
    tabButtons[2].nativeElement.click();

    fixture.detectChanges();

    const messageArea = tabPanel.query(By.css('.tab textarea'));

    expect(messageArea).toBeTruthy();

    const selectedButton = tabPanel.query(By.css('.tab-panel-buttons li.selected')).nativeElement;

    expect(selectedButton).toBeTruthy();
    expect(selectedButton.textContent).toBe('Contact');
  }));
});
