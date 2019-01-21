import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdDetailDialogComponent } from './ad-detail-dialog.component';

describe('AdDetailDialogComponent', () => {
  let component: AdDetailDialogComponent;
  let fixture: ComponentFixture<AdDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
