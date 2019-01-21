import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriceDialogComponent } from './add-price-dialog.component';

describe('AddPriceDialogComponent', () => {
  let component: AddPriceDialogComponent;
  let fixture: ComponentFixture<AddPriceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPriceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPriceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
