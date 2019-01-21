import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CshopComponent } from './cshop.component';

describe('CshopComponent', () => {
  let component: CshopComponent;
  let fixture: ComponentFixture<CshopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CshopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
