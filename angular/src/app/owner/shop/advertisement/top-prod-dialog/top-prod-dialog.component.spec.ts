import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopProdDialogComponent } from './top-prod-dialog.component';

describe('TopProdDialogComponent', () => {
  let component: TopProdDialogComponent;
  let fixture: ComponentFixture<TopProdDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopProdDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopProdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
