import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuInputModule } from 'au-input';
import { AuTabPanelModule } from 'au-tab-panel';
import { AppComponent } from './app.component';
import { AuModalModule } from './au-modal/au-modal.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;
  let modal: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        AuInputModule,
        AuTabPanelModule,
        AuModalModule.forRoot()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    modal = el.query(By.css('#testModal'));

    fixture.detectChanges();
  })

  it('should create the test application', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should not add the modal to the page, if the modal is closed', () => {
    expect(modal).toBeFalsy();
  })

  it('should open the modal when the test button is clicked', async(() => {
    fixture.nativeElement.querySelector('#testButton').click();
    fixture.detectChanges();

    const openedModal = fixture.nativeElement.querySelector('#testModal');

    expect(openedModal).toBeTruthy();
  }));
})
