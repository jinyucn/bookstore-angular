import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoHeaderComponent } from './so-header.component';

describe('SoHeaderComponent', () => {
  let component: SoHeaderComponent;
  let fixture: ComponentFixture<SoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
