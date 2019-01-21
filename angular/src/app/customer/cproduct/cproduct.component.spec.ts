import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CproductComponent } from './cproduct.component';

describe('CproductComponent', () => {
  let component: CproductComponent;
  let fixture: ComponentFixture<CproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
