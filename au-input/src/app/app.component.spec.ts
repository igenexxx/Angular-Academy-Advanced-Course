import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuFaInputComponent } from './lib/au-fa-input/au-fa-input.component';
import { InputRefDirective } from './lib/common/input-ref.directive';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;
  let emailField: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AuFaInputComponent,
        InputRefDirective,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    el = fixture.debugElement;
    emailField = el.query(By.css('#email-field'));
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should create a font awesome email input', async(() => {
    expect(emailField).toBeTruthy();
  }));

  it('should include the correct email icon inside the email input', async(() => {
    const icon = emailField.query(By.css('i.icon.fa.fa-envelope'));

    expect(icon).toBeTruthy();
  }));

  it('should have projected the correct test input inside the email field', () => {
    const input = emailField.query(By.css('input.test-class'));

    expect(input).toBeTruthy();
  });
});
