import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmywishComponent } from './cmywish.component';

describe('CmywishComponent', () => {
  let component: CmywishComponent;
  let fixture: ComponentFixture<CmywishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmywishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmywishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
