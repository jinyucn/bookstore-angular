import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoMainMenuComponent } from './so-main-menu.component';

describe('SoMainMenuComponent', () => {
  let component: SoMainMenuComponent;
  let fixture: ComponentFixture<SoMainMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoMainMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
